import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { Data } from '../../application/domain/model/data'
import { DataEntity } from '../entity/data.entity'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { IDataRepository } from '../../application/port/data.repository.interface'
import { DataRequestParameters } from '../../application/domain/model/data.request.parameters'
import { IEventBus } from '../port/event.bus.interface'
import { ValidationException } from '../../application/domain/exception/validation.exception'
import { DateUtils } from '../../application/domain/utils/date.utils'
import { MeasurementTypes } from '../../application/domain/utils/measurement.types'
import json2xls from 'json2xls'
import { Parser } from 'json2csv'
import { IEvaluationFilesManagerRepository } from '../../application/port/evaluation.files.manager.repository.interface'
import { EvaluationFile } from '../../application/domain/model/evaluation.file'
import { IIntegrationEventRepository } from '../../application/port/integration.event.repository.interface'
import { RepositoryException } from '../../application/domain/exception/repository.exception'
import jwt from 'jsonwebtoken'
import { Email } from '../../application/domain/model/email'
import { Default } from '../../utils/default'
import { EmailPilotStudyDataEvent } from '../../application/integration-event/event/email.pilot.study.data.event'
import { IntegrationEvent } from '../../application/integration-event/event/integration.event'

@injectable()
export class DataRepository extends BaseRepository<Data, DataEntity> implements IDataRepository {
    private _conn: any

    constructor(
        @inject(Identifier.DATA_REPO_MODEL) readonly _model: any,
        @inject(Identifier.DATA_ENTITY_MAPPER) readonly _mapper: IEntityMapper<Data, DataEntity>,
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.INTEGRATION_EVENT_REPOSITORY) private readonly _integrationEventRepo: IIntegrationEventRepository,
        @inject(Identifier.AWS_FILES_REPOSITORY) private readonly _awsFilesRepo: IEvaluationFilesManagerRepository<EvaluationFile>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_model, _mapper, _logger)
    }

    public removeDataFromPilotStudy(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Model.deleteMany({ pilotstudy_id: id })
                .then((result) => resolve(!!result))
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    public async generateData(pilotId: string, dataRequest: DataRequestParameters, token: string): Promise<void> {
        try {
            this._eventBus.connectionRpcClient
                .open(0, 2000)
                .then(async (conn) => {
                    this._conn = conn
                    this._logger.info('Connection with RPC Client opened successful!')
                    try {
                        const pilotStudy: any = await this.getPilotStudy(pilotId)
                        const patientsList: Array<any> = dataRequest.patients && dataRequest.patients.length ?
                            pilotStudy.patients.filter(item => dataRequest.patients!.includes(item.id)) :
                            pilotStudy.patients
                        if (!patientsList.length) throw new Error('There are no patients to make a data request.')

                        const dataList: Array<any> = []
                        for await (const patient of patientsList) {
                            dataList.push(await this.generatePatientData(patient, dataRequest.data_types!))
                        }

                        const bufferCsv: Buffer = await this.generateCsvEvaluation(dataList)
                        const bufferXls: Buffer = await this.generateXlsEvaluation(dataList)

                        const evaluationCsv: EvaluationFile = new EvaluationFile().fromJSON({
                            name: `ps_${pilotStudy.id}_${new Date().toISOString()}.csv`,
                            file: bufferCsv
                        })

                        const evaluationXls: EvaluationFile = new EvaluationFile().fromJSON({
                            name: `ps_${pilotStudy.id}_${new Date().toISOString()}.xls`,
                            file: bufferXls
                        })

                        const csvUrl: string = await this._awsFilesRepo.upload(evaluationCsv)
                        const xlsUrl: string = await this._awsFilesRepo.upload(evaluationXls)

                        const data: Data = new Data().fromJSON({
                            total_patients: dataList.length,
                            file_csv: csvUrl,
                            file_xls: xlsUrl,
                            pilotstudy_id: pilotStudy.id,
                            patients: patientsList.map(item => item.id),
                            data_types: dataRequest.data_types
                        })

                        const result: Data = await this.create(data)
                        const user: any = await this.getUserFromToken(token)

                        if (result && user && user.email) {
                            const mail: Email =
                                await this.buildEmail(pilotStudy, user, result, evaluationCsv.name!, evaluationXls.name!)
                            await this.sendMail(mail)
                        }
                        this.closeConnection()
                    } catch (err) {
                        throw new Error(err.message)
                    }
                }).catch(err => {
                throw new Error(err.message)
            })
        } catch (err) {
            this._logger.error(`RPC Client - Error at generate data: ${err.message}`)
        }
    }

    private async buildEmail(pilotStudy: any, user: any, data: Data, csvName: string, xlsName: string): Promise<Email> {
        try {
            const mail: Email = new Email().fromJSON({
                to: {
                    name: user.name,
                    email: user.email
                },
                attachments: [
                    {
                        filename: csvName,
                        path: data.file_csv,
                        content_type: 'text/csv'
                    },
                    {
                        filename: xlsName,
                        path: data.file_xls,
                        content_type: 'application/vnd.ms-excel'
                    }
                ],
                pilot_study: pilotStudy.name,
                request_date: data.created_at,
                action_url: process.env.DASHBOARD_HOST || Default.DASHBOARD_HOST,
                lang: pilotStudy.language
            })
            return Promise.resolve(mail)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async sendMail(mail: Email): Promise<void> {
        try {
            await this.publishEvent(new EmailPilotStudyDataEvent(new Date(), mail), 'emails.pilotstudies.data')
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async generatePatientData(patient: any, dataTypes: Array<string>): Promise<any> {
        try {
            const measurements: any = await this.getMeasurementsFromPatient(patient.id)
            const nutritionalQuestionnaire: any =
                await this.getNutritionalQuestionnairesFromPatient(patient.id)
            const odontologicalQuestionnaire: any =
                await this.getOdontologicalQuestionnairesFromPatient(patient.id)

            const result: any = {
                ...this.getPatientData(patient),
                ...this.getMeasurementData(measurements, dataTypes),
                ...this.getOdontologicalData(odontologicalQuestionnaire, dataTypes),
                ...this.getNutritionalData(nutritionalQuestionnaire, dataTypes)
            }
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private closeConnection() {
        if (this._conn) {
            this._conn.close().then(() => {
                this._logger.info('Connection with RPC Client closed successful!')
            }).catch(err => {
                throw new Error(`Error at close the RPC Client connection: ${err.message}`)
            })
        }
    }

    private async getPilotStudy(id: string): Promise<any> {
        try {
            const result: any =
                await this._eventBus.executeResource('account.rpc', 'pilotstudies.findone', id)
            this.validatePilotStudy(result)
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async getUserFromToken(token: string): Promise<any> {
        try {
            const payload: any = await this.getTokenPayload(token)
            const result: any =
                await this._eventBus.executeResource(
                    'account.rpc',
                    'users.find',
                    `?_id=${payload.sub}`)
            return Promise.resolve(result[0])
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private validatePilotStudy(pilot: any): void | ValidationException {
        if (!pilot) throw new ValidationException('Pilot Study does not exists!')
        if (!pilot.patients || !pilot.patients.length) {
            throw new ValidationException('Pilot Study does not have associated patients!')
        }
    }

    private async getMeasurementsFromPatient(patientId: string): Promise<any> {
        try {
            const result: Array<any> = await this._eventBus.executeResource(
                'mhealth.rpc',
                'measurements.find',
                `?patient_id=${patientId}`)
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async getNutritionalQuestionnairesFromPatient(patientId: string): Promise<any> {
        try {
            const result: any = await this._eventBus.executeResource(
                'ehr.rpc',
                'nutritional.questionnaires.find',
                `?patient_id=${patientId}&sort=-created_at&limit=1`)
            return Promise.resolve(result && result.length ? result[0] : {})
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async getOdontologicalQuestionnairesFromPatient(patientId: string): Promise<any> {
        try {
            const result: any = await this._eventBus.executeResource(
                'ehr.rpc',
                'odontological.questionnaires.find',
                `?patient_id=${patientId}&sort=-created_at&limit=1`)
            return Promise.resolve(result && result.length ? result[0] : {})
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private getPatientData(patient: any): any {
        const result: any = {}
        if (patient.gender) result.gender = patient.gender === 'male' ? 1 : 2
        if (patient.birth_date) result.age = DateUtils.getAgeFromBirthDate(patient.birth_date).age
        return result
    }

    private getMeasurementData(measurements: Array<any>, dataTypes: Array<string>): any {
        const result: any = {
            height: '',
            waist_circumference: '',
            weight: '',
            blood_glucose_value: '',
            blood_glucose_meal: '',
            blood_pressure_systolic: '',
            blood_pressure_diastolic: '',
            blood_pressure_pulse: '',
            body_temperature: '',
            body_fat: ''
        }
        const height: any = measurements.filter(item => item.type === MeasurementTypes.HEIGHT)[0]
        if (height && dataTypes.includes('height')) result.height = height.value
        const waist: any = measurements.filter(item => item.type === MeasurementTypes.WAIST_CIRCUMFERENCE)[0]
        if (waist && dataTypes.includes('waist_circumference')) result.waist_circumference = waist.value
        const weight: any = measurements.filter(item => item.type === MeasurementTypes.WEIGHT)[0]
        if (weight && dataTypes.includes('weight')) result.weight = weight.value
        const bloodGlucose: any = measurements.filter(item => item.type === MeasurementTypes.BLOOD_GLUCOSE)[0]
        if (bloodGlucose && dataTypes.includes('blood_glucose')) {
            result.blood_glucose_value = bloodGlucose.value
            result.blood_glucose_meal =
                ['preprandial', 'postprandial', 'fasting', 'casual', 'bedtime'].indexOf(bloodGlucose.meal) + 1
        }
        const bloodPressure: any =
            measurements.filter(item => item.type === MeasurementTypes.BLOOD_PRESSURE)[0]
        if (bloodPressure && dataTypes.includes('blood_pressure')) {
            result.blood_pressure_systolic = bloodPressure.systolic
            result.blood_pressure_diastolic = bloodPressure.diastolic
            result.blood_pressure_pulse = bloodPressure.pulse
        }
        const bodyTemperature: any =
            measurements.filter(item => item.type === MeasurementTypes.BODY_TEMPERATURE)[0]
        if (bodyTemperature && dataTypes.includes('body_temperature')) result.body_temperature = bodyTemperature.value
        const bodyFat: any = measurements.filter(item => item.type === MeasurementTypes.BODY_FAT)[0]
        if (bodyFat && dataTypes.includes('body_fat')) result.body_fat = bodyFat.value
        return result
    }

    private getOdontologicalData(questionnaire: any, dataTypes: Array<string>): any {
        const result: any = {
            color_race: '',
            mother_scholarity: '',
            people_in_home: '',
            family_mutual_aid_freq: '',
            friendship_approval_freq: '',
            family_only_task_freq: '',
            family_only_preference_freq: '',
            free_time_together_freq: '',
            family_proximity_perception_freq: '',
            all_family_tasks_freq: '',
            family_tasks_opportunity_freq: '',
            family_decision_support_freq: '',
            family_union_relevance_freq: '',
            family_cohesion_result: '',
            teeth_brushing_freq: '',
            teeth_cavitated_lesion_deciduous_tooth: '',
            teeth_cavitated_lesion_permanent_tooth: '',
            teeth_white_spot_lesion_deciduous_tooth: '',
            teeth_white_spot_lesion_permanent_tooth: ''
        }
        if (!Object.keys(questionnaire).length) return result
        if (dataTypes.includes('sociodemographic_record')) {
            result.color_race =
                ['white', 'black', 'parda', 'yellow']
                    .indexOf(questionnaire.sociodemographic_record.color_race) + 1
            result.mother_scholarity = [
                'unlettered_elementary_one_incomplete',
                'elementary_one_elementary_two_incomplete',
                'elementary_two_high_school_incomplete',
                'medium_graduation_incomplete',
                'graduation_complete'].indexOf(questionnaire.sociodemographic_record.mother_scholarity) + 1
            result.people_in_home =
                questionnaire.sociodemographic_record.people_in_home <= 6 ?
                    questionnaire.sociodemographic_record.people_in_home : 6
        }
        if (dataTypes.includes('family_cohesion_record')) {
            const freqs: Array<string> = ['almost_never', 'rarely', 'sometimes', 'often', 'almost_aways']
            result.family_mutual_aid_freq = freqs.indexOf(questionnaire.family_cohesion_record.family_mutual_aid_freq) + 1
            result.friendship_approval_freq = freqs.indexOf(questionnaire.family_cohesion_record.friendship_approval_freq) + 1
            result.family_only_task_freq = freqs.indexOf(questionnaire.family_cohesion_record.family_only_task_freq) + 1
            result.family_only_preference_freq =
                freqs.indexOf(questionnaire.family_cohesion_record.family_only_preference_freq) + 1
            result.free_time_together_freq = freqs.indexOf(questionnaire.family_cohesion_record.free_time_together_freq) + 1
            result.family_proximity_perception_freq =
                freqs.indexOf(questionnaire.family_cohesion_record.family_proximity_perception_freq) + 1
            result.all_family_tasks_freq = freqs.indexOf(questionnaire.family_cohesion_record.all_family_tasks_freq) + 1
            result.family_tasks_opportunity_freq =
                freqs.indexOf(questionnaire.family_cohesion_record.family_tasks_opportunity_freq) + 1
            result.family_decision_support_freq =
                freqs.indexOf(questionnaire.family_cohesion_record.family_decision_support_freq) + 1
            result.family_union_relevance_freq =
                freqs.indexOf(questionnaire.family_cohesion_record.family_union_relevance_freq) + 1
            result.family_cohesion_result = questionnaire.family_cohesion_record.family_cohesion_result
        }
        if (dataTypes.includes('oral_health_record')) {
            result.teeth_brushing_freq =
                ['none', 'once', 'twice', 'three_more'].indexOf(questionnaire.oral_health_record.teeth_brushing_freq) + 1
            result.teeth_cavitated_lesion_deciduous_tooth =
                questionnaire.oral_health_record.teeth_lesions.filter(
                    item => item.tooth_type === 'deciduous_tooth' && item.lesion_type === 'cavitated_lesion')[0] ?
                    1 : 2
            result.teeth_cavitated_lesion_permanent_tooth =
                questionnaire.oral_health_record.teeth_lesions.filter(
                    item => item.tooth_type === 'permanent_tooth' && item.lesion_type === 'cavitated_lesion')[0] ?
                    1 : 2
            result.teeth_white_spot_lesion_deciduous_tooth =
                questionnaire.oral_health_record.teeth_lesions.filter(
                    item => item.tooth_type === 'deciduous_tooth' && item.lesion_type === 'white_spot_lesion')[0] ?
                    1 : 2
            result.teeth_white_spot_lesion_permanent_tooth =
                questionnaire.oral_health_record.teeth_lesions.filter(
                    item => item.tooth_type === 'permanent_tooth' && item.lesion_type === 'white_spot_lesion')[0] ?
                    1 : 2
        }
        return result
    }

    private getNutritionalData(questionnaire: any, dataTypes: Array<string>): any {
        const result: any = {
            fish_chicken_meat_consumption_frequency: '',
            soda_consumption_frequency: '',
            salad_vegetable_consumption_frequency: '',
            fried_salt_food_consumption_frequency: '',
            milk_consumption_frequency: '',
            bean_consumption_frequency: '',
            fruits_consumption_frequency: '',
            candy_sugar_cookie_consumption_frequency: '',
            burger_sausage_consumption_frequency: '',
            daily_water_glasses: '',
            six_month_breast_feeding: '',
            gluten_allergy_intolerance: '',
            aplv_allergy_intolerance: '',
            lactose_allergy_intolerance: '',
            dye_allergy_intolerance: '',
            egg_allergy_intolerance: '',
            peanut_allergy_intolerance: '',
            other_allergy_intolerance: '',
            undefined_allergy_intolerance: '',
            breakfast_daily_frequency: '',
            daily_sleep_time: '',
            school_ativity_freq: '',
            weekly_none_activity: '',
            weekly_football_practice: '',
            weekly_futsal_practice: '',
            weekly_handball_practice: '',
            weekly_basketball_practice: '',
            weekly_roller_skate_practice: '',
            weekly_athletics_practice: '',
            weekly_swimming_practice: '',
            weekly_olympic_rhythmic_gymnastics_practice: '',
            weekly_fight_practice: '',
            weekly_dance_practice: '',
            weekly_run_practice: '',
            weekly_bike_practice: '',
            weekly_exercise_walking_practice: '',
            weekly_locomotion_walking_practice: '',
            weekly_volleyball_practice: '',
            weekly_bodybuilding_practice: '',
            weekly_abdominal_practice: '',
            weekly_tennis_practice: '',
            weekly_dog_walk_practice: '',
            weekly_gym_exercise_practice: '',
            hypertension_history: '',
            diabetes_history: '',
            blood_fat_history: ''
        }
        if (!Object.keys(questionnaire).length) return result
        const freq: Array<string> =
            ['never', 'no_day', 'one_two_days', 'three_four_days', 'five_six_days', 'all_days', 'undefined']
        if (dataTypes.includes('feeding_habits_record')) {
            result.fish_chicken_meat_consumption_frequency =
                freq.indexOf(questionnaire.feeding_habits_record.weekly_feeding_habits
                    .filter(item => item.food === 'fish_chicken_meat')[0].seven_days_freq) + 1
            result.soda_consumption_frequency =
                freq.indexOf(questionnaire.feeding_habits_record.weekly_feeding_habits
                    .filter(item => item.food === 'soda')[0].seven_days_freq) + 1
            result.salad_vegetable_consumption_frequency =
                freq.indexOf(questionnaire.feeding_habits_record.weekly_feeding_habits
                    .filter(item => item.food === 'salad_vegetable')[0].seven_days_freq) + 1
            result.fried_salt_food_consumption_frequency =
                freq.indexOf(questionnaire.feeding_habits_record.weekly_feeding_habits
                    .filter(item => item.food === 'fried_salt_food')[0].seven_days_freq) + 1
            result.milk_consumption_frequency =
                freq.indexOf(questionnaire.feeding_habits_record.weekly_feeding_habits
                    .filter(item => item.food === 'milk')[0].seven_days_freq) + 1
            result.bean_consumption_frequency =
                freq.indexOf(questionnaire.feeding_habits_record.weekly_feeding_habits
                    .filter(item => item.food === 'bean')[0].seven_days_freq) + 1
            result.fruits_consumption_frequency =
                freq.indexOf(questionnaire.feeding_habits_record.weekly_feeding_habits
                    .filter(item => item.food === 'fruits')[0].seven_days_freq) + 1
            result.candy_sugar_cookie_consumption_frequency =
                freq.indexOf(questionnaire.feeding_habits_record.weekly_feeding_habits
                    .filter(item => item.food === 'candy_sugar_cookie')[0].seven_days_freq) + 1
            result.burger_sausage_consumption_frequency =
                freq.indexOf(questionnaire.feeding_habits_record.weekly_feeding_habits
                    .filter(item => item.food === 'burger_sausage')[0].seven_days_freq) + 1
            result.daily_water_glasses =
                ['none', 'one_two', 'three_four', 'five_more', 'undefined']
                    .indexOf(questionnaire.feeding_habits_record.daily_water_glasses) + 1
            result.six_month_breast_feeding =
                ['exclusive', 'complementary', 'infant_formulas', 'other', 'undefined']
                    .indexOf(questionnaire.feeding_habits_record.six_month_breast_feeding) + 1
            result.gluten_allergy_intolerance =
                questionnaire.feeding_habits_record.food_allergy_intolerance.includes('gluten') ? 1 : 2
            result.aplv_allergy_intolerance =
                questionnaire.feeding_habits_record.food_allergy_intolerance.includes('aplv') ? 1 : 2
            result.lactose_allergy_intolerance =
                questionnaire.feeding_habits_record.food_allergy_intolerance.includes('lactose') ? 1 : 2
            result.dye_allergy_intolerance =
                questionnaire.feeding_habits_record.food_allergy_intolerance.includes('dye') ? 1 : 2
            result.egg_allergy_intolerance =
                questionnaire.feeding_habits_record.food_allergy_intolerance.includes('egg') ? 1 : 2
            result.peanut_allergy_intolerance =
                questionnaire.feeding_habits_record.food_allergy_intolerance.includes('peanut') ? 1 : 2
            result.other_allergy_intolerance =
                questionnaire.feeding_habits_record.food_allergy_intolerance.includes('other') ? 1 : 2
            result.undefined_allergy_intolerance =
                questionnaire.feeding_habits_record.food_allergy_intolerance.includes('undefined ') ? 1 : 2
            result.breakfast_daily_frequency =
                ['never', 'sometimes', 'almost_everyday', 'everyday', 'undefined']
                    .indexOf(questionnaire.feeding_habits_record.breakfast_daily_frequency) + 1
        }
        if (dataTypes.includes('sleep_habit')) {
            result.daily_sleep_time = 24 -
                parseInt(questionnaire.sleep_habit.week_day_sleep, 10) +
                parseInt(questionnaire.sleep_habit.week_day_wake_up, 10)
        }
        if (dataTypes.includes('physical_activity_habits')) {
            result.school_activity_freq =
                ['one_per_week', 'two_per_week', 'three_per_week', 'four_more_per_week', 'none']
                    .indexOf(questionnaire.physical_activity_habits.school_activity_freq) + 1
            result.weekly_none_activity =
                questionnaire.physical_activity_habits.weekly_activities.includes('none') ? 1 : 2
            result.weekly_football_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('football') ? 1 : 2
            result.weekly_futsal_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('futsal') ? 1 : 2
            result.weekly_handball_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('handball') ? 1 : 2
            result.weekly_basketball_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('basketball') ? 1 : 2
            result.weekly_roller_skate_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('roller_skate') ? 1 : 2
            result.weekly_athletics_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('athletics') ? 1 : 2
            result.weekly_swimming_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('swimming') ? 1 : 2
            result.weekly_olympic_rhythmic_gymnastics_practice =
                questionnaire.physical_activity_habits.weekly_activities
                    .includes('olympic_rhythmic_gymnastics') ? 1 : 2
            result.weekly_fight_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('fight') ? 1 : 2
            result.weekly_dance_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('dance') ? 1 : 2
            result.weekly_run_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('run') ? 1 : 2
            result.weekly_bike_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('bike') ? 1 : 2
            result.weekly_exercise_walking_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('exercise_walking') ? 1 : 2
            result.weekly_locomotion_walking_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('locomotion_walking') ? 1 : 2
            result.weekly_volleyball_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('volleyball') ? 1 : 2
            result.weekly_bodybuilding_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('bodybuilding') ? 1 : 2
            result.weekly_abdominal_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('abdominal') ? 1 : 2
            result.weekly_tennis_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('tennis') ? 1 : 2
            result.weekly_dog_walk_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('dog_walk') ? 1 : 2
            result.weekly_gym_exercise_practice =
                questionnaire.physical_activity_habits.weekly_activities.includes('gym_exercise') ? 1 : 2
        }
        if (dataTypes.includes('medical_record')) {
            const hypertension =
                questionnaire.medical_record.chronic_diseases.filter(item => item.type === 'hypertension')[0]
            const diabetes =
                questionnaire.medical_record.chronic_diseases.filter(item => item.type === 'diabetes')[0]
            const blood_fat =
                questionnaire.medical_record.chronic_diseases.filter(item => item.type === 'blood_fat')[0]
            result.hypertension_history = hypertension ? ['yes', 'no', 'undefined'].indexOf(hypertension.disease_history) : 2
            result.diabetes_history = diabetes ? ['yes', 'no', 'undefined'].indexOf(hypertension.disease_history) : 2
            result.blood_fat_history = blood_fat ? ['yes', 'no', 'undefined'].indexOf(hypertension.disease_history) : 2
        }
        return result
    }

    private async generateCsvEvaluation(evaluation: any): Promise<Buffer> {
        const fields = Object.keys(evaluation[0])
        const opts = { fields }
        try {
            const parser = new Parser(opts)
            const csv = parser.parse(evaluation)
            return Promise.resolve(Buffer.from(csv))
            // fs.writeFileSync('./file.csv', csv)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async generateXlsEvaluation(evaluation: any): Promise<Buffer> {
        try {
            const xls = json2xls(evaluation)
            return Promise.resolve(Buffer.from(xls, 'binary'))
            // fs.writeFileSync('./file.xls', xls, 'binary')
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async publishEvent(event: IntegrationEvent<Data>, routingKey: string): Promise<void> {
        try {
            const successPublish = await this._eventBus.publish(event, routingKey)
            if (!successPublish) throw new Error('')
            this._logger.info(`Data from pilot study: ${event.toJSON().email.pilot_study} ` +
                `has been saved and published on event bus to be sended to: ${event.toJSON().email.to.email}`)
        } catch (err) {
            const saveEvent: any = event.toJSON()
            this._integrationEventRepo.create({
                ...saveEvent,
                __routing_key: routingKey,
                __operation: 'publish'
            })
                .then(() => {
                    this._logger.warn(`Could not publish the event named ${event.event_name}.`
                        .concat(` The event was saved in the database for a possible recovery.`))
                })
                .catch(err => {
                    this._logger.error(`There was an error trying to save the name event: ${event.event_name}.`
                        .concat(`Error: ${err.message}. Event: ${JSON.stringify(saveEvent)}...`))
                })
        }
    }

    private getTokenPayload(token: string): Promise<any> {
        try {
            return Promise.resolve(jwt.decode(token))
        } catch (err) {
            return Promise.reject(new RepositoryException('Could not get the token payload. ' +
                'Please try again later.'))
        }
    }
}
