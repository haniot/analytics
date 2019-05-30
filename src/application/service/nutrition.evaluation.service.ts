import { inject, injectable } from 'inversify'
import { INutritionEvaluationService } from '../port/nutrition.evaluation.service.interface'
import { IQuery } from '../port/query.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationRepository } from '../port/nutrition.evaluation.repository.interface'
import { EvaluationTypes } from '../domain/utils/evaluation.types'
import { NutritionEvaluationRequest } from '../domain/model/nutrition.evaluation.request'
import { CreateNutritionEvaluationValidator } from '../domain/validator/create.nutrition.evaluation.validator'
import { NutritionCouncil } from '../domain/model/nutrition.council'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { Query } from '../../infrastructure/repository/query/query'
import { NutritionEvaluationStatusTypes } from '../domain/utils/nutrition.evaluation.status.types'
import { OverweightClassificationTypes } from '../domain/utils/overweight.classification.types'
import { BmiPerAgeClassificationTypes } from '../domain/utils/bmi.per.age.classification.types'
import { BmiPerAge } from '../domain/model/bmi.per.age'
import { AgeBmiPercentile } from '../domain/model/age.bmi.percentile'
import { BloodGlucoseZones } from '../domain/utils/blood.glucose.zones'
import { BloodGlucoseClassificationTypes } from '../domain/utils/blood.glucose.classification.types'
import { MeasurementTypes } from '../domain/utils/measurement.types'
import { DateUtils } from '../domain/utils/date.utils'
import { NutritionStatus } from '../domain/model/nutrition.status'
import { OverweightIndicator } from '../domain/model/overweight.indicator'
import { HeartRate } from '../domain/model/heart.rate'
import { BloodGlucose } from '../domain/model/blood.glucose'
import { Zone } from '../domain/model/zone'
import { Counseling } from '../domain/model/counseling'
import { NutritionCounseling } from '../domain/model/nutrition.counseling'
import { BloodPressurePercentileClassificationTypes } from '../domain/utils/blood.pressure.percentile.classification.types'
import { BloodPressure } from '../domain/model/blood.pressure'
import { AgeHeightPercentile } from '../domain/model/age.height.percentile'
import { BloodPressurePerAgeHeight } from '../domain/model/blood.pressure.per.age.height'
import { GenderTypes } from '../domain/utils/gender.types'
import { ValidationException } from '../domain/exception/validation.exception'
import { BloodPressurePerSysDias } from '../domain/model/blood.pressure.per.sys.dias'
import { IFileRepository } from '../port/files.repository.interface'
import { NutritionEvaluationRequestValidator } from '../domain/validator/nutrition.evaluation.request.validator'

@injectable()
export class NutritionEvaluationService implements INutritionEvaluationService {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_REPOSITORY)
        private readonly _nutritionEvaluationRepo: INutritionEvaluationRepository,
        @inject(Identifier.BLOOD_PRESSURE_PER_AGE_HEIGHT_REPOSITORY)
        private readonly _bloodPressurePerAgeHeightRepo: IFileRepository<BloodPressurePerAgeHeight>,
        @inject(Identifier.BLOOD_PRESSURE_PER_SYS_DIAS_REPOSITORY)
        private readonly _bloodPressurePerSysDiasRepo: IFileRepository<BloodPressurePerSysDias>,
        @inject(Identifier.BMI_PER_AGE_REPOSITORY)
        private readonly _bmiPerAgeRepo: IFileRepository<BmiPerAge>,
        @inject(Identifier.NUTRITION_COUNSELING_REPOSITORY)
        private readonly _nutritionCounselingRepo: IFileRepository<NutritionCounseling>
    ) {
    }

    public add(item: NutritionEvaluation): Promise<NutritionEvaluation> {
        try {
            CreateNutritionEvaluationValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._nutritionEvaluationRepo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<NutritionEvaluation>> {
        try {
            const pilotId = query.toJSON().filters.pilotstudy_id
            if (pilotId) ObjectIdValidator.validate(pilotId)
            const patientId = query.toJSON().filters.patient_id
            if (patientId) ObjectIdValidator.validate(patientId)
            const healthProfessionalId = query.toJSON().filters.healthprofessional_id
            if (healthProfessionalId) ObjectIdValidator.validate(healthProfessionalId)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ type: EvaluationTypes.NUTRITION })
        return this._nutritionEvaluationRepo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<NutritionEvaluation> {
        try {
            ObjectIdValidator.validate(id)
            const patientId = query.toJSON().filters.patient_id
            if (patientId) ObjectIdValidator.validate(patientId)
            const pilotId = query.toJSON().filters.pilotstudy_id
            if (pilotId) ObjectIdValidator.validate(pilotId)
            ObjectIdValidator.validate(id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: EvaluationTypes.NUTRITION })
        return this._nutritionEvaluationRepo.findOne(query)
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented!')
    }

    public update(item: NutritionEvaluation): Promise<NutritionEvaluation> {
        throw Error('Not implemented!')
    }

    public async addEvaluation(item: NutritionEvaluationRequest): Promise<NutritionEvaluation> {
        try {
            NutritionEvaluationRequestValidator.validate(item)
            const evaluation: NutritionEvaluation = await this.generateEvaluation(item)
            return this.add(evaluation)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    public async updateNutritionalCounseling(patientId: string, evaluationId: string, counseling: NutritionCouncil):
        Promise<NutritionEvaluation> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(evaluationId)
            const nutritionEvaluation: NutritionEvaluation =
                await this.getById(evaluationId, new Query().fromJSON({ filters: { 'patient.id': patientId } }))
            if (!nutritionEvaluation) return Promise.resolve(undefined!)
            nutritionEvaluation.counseling!.definitive = counseling
            nutritionEvaluation.status = NutritionEvaluationStatusTypes.COMPLETE
            return await this._nutritionEvaluationRepo.update(nutritionEvaluation)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    public async removeEvaluation(patientId: string, evaluationId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(evaluationId)
            return await this._nutritionEvaluationRepo.delete(evaluationId)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    // Generate Nutrition Evaluation Function
    private async generateEvaluation(item: NutritionEvaluationRequest): Promise<NutritionEvaluation> {
        const result: NutritionEvaluation = new NutritionEvaluation()
        try {
            const info = await this.getNutritionalEvaluationInformation(item)

            // Set General Information
            result.status = NutritionEvaluationStatusTypes.INCOMPLETE
            result.patient = item.patient
            result.pilotstudy_id = info.pilotstudy_id
            result.health_professional_id = info.health_professional_id
            result.measurements = item.measurements
            result.physical_activity_habits = item.physical_activity_habits
            result.feeding_habits_record = item.feeding_habits_record
            result.medical_record = item.medical_record
            result.sleep_habit = item.sleep_habit

            // Set Nutritional Status
            result.nutritional_status = await this.getNutritionalStatus(
                info.patient.age.value_with_month,
                info.patient.gender,
                info.measurements.height,
                info.measurements.weight
            )
            // Set Overweight Indicator
            result.overweight_indicator =
                this.getOverweightIndicator(info.measurements.waist_circumference, info.measurements.height)

            // Set Taylor Cut Point
            result.taylor_cut_point

            // Set Heart Rate
            result.heart_rate = this.getHeartRate(info.measurements.heart_rate)

            // Set Blood Glucose

            result.blood_glucose =
                this.getBloodGlucose(info.measurements.blood_glucose.value, info.measurements.blood_glucose.meal)

            // Set Blood Pressure

            result.blood_pressure = await this.getBloodPressure(
                info.patient.age.value,
                info.patient.gender,
                info.measurements.height,
                info.measurements.blood_pressure.systolic,
                info.measurements.blood_pressure.diastolic
            )

            // Set Counseling
            result.counseling = new Counseling().fromJSON({
                suggested: await this.getCounselings(
                    result.nutritional_status.classification!,
                    result.overweight_indicator.classification!,
                    result.blood_glucose.classification!,
                    result.blood_pressure.classification!)
            })

            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    // Evaluation Information Functions
    private async getNutritionalEvaluationInformation(request: NutritionEvaluationRequest): Promise<any> {
        try {
            const patient: any = request.patient!.toJSON()
            const height = request.measurements!
                .filter(item => item.type === MeasurementTypes.HEIGHT)[0].toJSON()
            const weight = request.measurements!
                .filter(item => item.type === MeasurementTypes.WEIGHT)[0].toJSON()
            const heart_rate = request.measurements!
                .filter(item => item.type === MeasurementTypes.HEART_RATE)[0].toJSON()
            const blood_glucose = request.measurements!
                .filter(item => item.type === MeasurementTypes.BLOOD_GLUCOSE)[0].toJSON()
            const blood_pressure = request.measurements!
                .filter(item => item.type === MeasurementTypes.BLOOD_PRESSURE)[0].toJSON()
            const waist_circumference = request.measurements!
                .filter(item => item.type === MeasurementTypes.WAIST_CIRCUMFERENCE)[0].toJSON()

            const patientAge: any = DateUtils.getAgeFromBirthDate(patient.birth_date)

            const result = {
                patient: {
                    age: {
                        value: patientAge.age,
                        value_with_month: patientAge.age_with_months
                    },
                    gender: patient.gender
                },
                measurements: {
                    height: height.value,
                    weight: weight.value,
                    heart_rate: heart_rate.dataset,
                    blood_glucose: {
                        value: blood_glucose.value,
                        meal: blood_glucose.meal
                    },
                    blood_pressure: {
                        systolic: blood_pressure.systolic,
                        diastolic: blood_pressure.diastolic
                    },
                    waist_circumference: waist_circumference.value
                },
                pilotstudy_id: request.pilotstudy_id,
                health_professional_id: request.health_professional_id
            }

            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    // Bmi Functions
    public async getNutritionalStatus(age: string, gender: string, height: number, weight: number): Promise<NutritionStatus> {
        const result: NutritionStatus = new NutritionStatus()
        try {
            result.height = height
            result.weight = weight
            result.bmi = this.calculateBmi(weight, height)
            const percentile: AgeBmiPercentile = await this.getBmiPercentileFromAgeGender(age, gender)
            const bmiClassification = this.getBmiClassification(result.bmi, percentile)
            result.percentile = bmiClassification.percentile
            result.classification = bmiClassification.classification
        } catch (err) {
            return Promise.reject(err)
        }
        return Promise.resolve(result)
    }

    private calculateBmi(weight: number, height: number): number {
        return parseFloat((weight / Math.pow((height / 100), 2)).toFixed(1))
    }

    private async getBmiPercentileFromAgeGender(age: string, gender: string): Promise<AgeBmiPercentile> {
        try {
            const bmiPerAge: BmiPerAge = await this._bmiPerAgeRepo.getFile()
            if (gender === 'male') return Promise.resolve(bmiPerAge.bmi_per_age_boys!.filter(value => value.age === age)[0])
            return Promise.resolve(bmiPerAge.bmi_per_age_girls!.filter(value => value.age === age)[0])
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private getBmiClassification(bmi: number, percentile: any): any {
        if (!percentile) return {
            percentile: 'undefined',
            classification: 'undefined'
        }

        if (bmi < percentile.p01) return {
            percentile: 'p01',
            classification: BmiPerAgeClassificationTypes.ACCENTUATED_THINNESS
        }
        else if (percentile.p01 < bmi && bmi < percentile.p3) return {
            percentile: 'p3',
            classification: BmiPerAgeClassificationTypes.THINNESS
        }
        else if (percentile.p3 < bmi && bmi < percentile.p85) return {
            percentile: 'p85',
            classification: BmiPerAgeClassificationTypes.EUTROPHY
        }
        else if (percentile.p85 < bmi && bmi < percentile.p97) return {
            percentile: 'p97',
            classification: BmiPerAgeClassificationTypes.OVERWEIGHT
        }
        else if (percentile.p97 < bmi && bmi < percentile.p999) return {
            percentile: 'p999',
            classification: BmiPerAgeClassificationTypes.OBESITY
        }
        else return { percentile: 'p999', classification: BmiPerAgeClassificationTypes.SEVERE_OBESITY }
    }

    // Waist-Height Functions
    private getOverweightIndicator(waist: number, height: number): OverweightIndicator {
        const result: OverweightIndicator = new OverweightIndicator()
        result.height = height
        result.waist_circumference = waist
        result.waist_height_relation = this.getWaistHeightRelation(waist, height)
        result.classification = result.waist_height_relation < 0.5 ?
            OverweightClassificationTypes.NORMAL : OverweightClassificationTypes.OVERWEIGHT_OBESITY_RISK
        return result
    }

    private getWaistHeightRelation(waist: number, height: number) {
        return parseFloat((waist / height).toFixed(2))
    }

    // Taylor Cut Point

    // Heart Rate Functions
    private getHeartRate(dataSet: Array<any>): HeartRate {
        return new HeartRate().fromJSON({
            min: dataSet.reduce((min, item) => Math.min(min, item.value), dataSet[0].value),
            max: dataSet.reduce((max, item) => Math.max(max, item.value), dataSet[0].value),
            average: Math.round(
                dataSet
                    .map(item => item.value)
                    .reduce((prev, curr) => prev + curr) / dataSet.length),
            dataset: dataSet
        })
    }

    // Blood Glucose Functions
    private getBloodGlucose(value: number, meal: string): BloodGlucose {
        const result: BloodGlucose = new BloodGlucose()
        result.value = value
        result.meal = meal
        result.classification = this.getBloodGlucoseClassification(value, meal)
        result.zones = [new Zone().fromJSON(BloodGlucoseZones.zones)]
        return result
    }

    private getBloodGlucoseClassification(value: number, meal: string): string {
        const bloodGlucoseLevels = BloodGlucoseZones.zones[meal]
        if (bloodGlucoseLevels.good.min < value && value < bloodGlucoseLevels.good.max) {
            return BloodGlucoseClassificationTypes.GOOD
        } else if (bloodGlucoseLevels.great.min < value && value < bloodGlucoseLevels.great.max) {
            return BloodGlucoseClassificationTypes.GREAT
        }
        return BloodGlucoseClassificationTypes.UNDEFINED
    }

    // Blood Pressure Functions
    private async getBloodPressure(age: number, gender: string, height: number, sys: number, dias: number):
        Promise<BloodPressure> {
        try {
            const result: BloodPressure = new BloodPressure().fromJSON({
                    systolic: sys,
                    diastolic: dias,
                    systolic_percentile: 'undefined',
                    diastolic_percentile: 'undefined',
                    classification: 'undefined'
                }
            )

            const bmiPerAgeHeight = await this.getBloodPressureAgeHeightPercentile(age, height, gender)
            if (!bmiPerAgeHeight) return Promise.resolve(result)

            const ageHeightPercentile = await this.getBloodPressurePercentile(gender, age, bmiPerAgeHeight.percentile!, sys)
            result.systolic_percentile = ageHeightPercentile.systolic_percentile
            result.diastolic_percentile = ageHeightPercentile.diastolic_percentile

            if (!ageHeightPercentile.percentile) {
                result.classification = 'undefined'
                return Promise.resolve(result)
            }
            result.classification = this.getBloodPressurePercentileClassification(ageHeightPercentile)
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async getBloodPressureAgeHeightPercentile(age: number, height: number, gender: string): Promise<AgeHeightPercentile> {
        try {
            const bloodPressurePerAge: BloodPressurePerAgeHeight = await this._bloodPressurePerAgeHeightRepo.getFile()
            if (gender === GenderTypes.MALE) {
                return Promise.resolve(bloodPressurePerAge.blood_pressure_per_age_boys!
                    .filter(item => item.age === age && item.height === height)[0])
            }
            return Promise.resolve(bloodPressurePerAge.blood_pressure_per_age_girls!
                .filter(item => item.age === age && item.height === height)[0])
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async getBloodPressurePercentile(gender: string, age: number, percentile: number, sys: number): Promise<any> {
        const bloodPressurePerSysDias: BloodPressurePerSysDias = await this._bloodPressurePerSysDiasRepo.getFile()
        let data = bloodPressurePerSysDias.age_systolic_diastolic_percentile_boys!.filter(item => item.age === age)
        if (gender === GenderTypes.FEMALE) {
            data = bloodPressurePerSysDias.age_systolic_diastolic_percentile_girls!.filter(item => item.age === age)
        }

        let filtering

        try {
            switch (percentile) {
                case (5):
                    filtering = data.filter(item => item.age === age && item.pas_5 === sys)[0]
                    return Promise.resolve(
                        filtering ?
                            { percentile: filtering.percentile, systolic_percentile: 'pas5', diastolic_percentile: 'pad5' } :
                            { percentile: undefined, systolic_percentile: 'pas5', diastolic_percentile: 'pad5' })
                case (10):
                    filtering = data.filter(item => item.pas_10 === sys)[0]
                    return Promise.resolve(
                        filtering ?
                            { percentile: filtering.percentile, systolic_percentile: 'pas10', diastolic_percentile: 'pad10' } :
                            { percentile: undefined, systolic_percentile: 'pas10', diastolic_percentile: 'pad10' })
                case (25):
                    filtering = data.filter(item => item.pas_25 === sys)[0]
                    return Promise.resolve(
                        filtering ?
                            { percentile: filtering.percentile, systolic_percentile: 'pas25', diastolic_percentile: 'pad25' } :
                            { percentile: undefined, systolic_percentile: 'pas25', diastolic_percentile: 'pad25' })
                case (50):
                    filtering = data.filter(item => item.pas_50 === sys)[0]
                    return Promise.resolve(
                        filtering ?
                            { percentile: filtering.percentile, systolic_percentile: 'pas50', diastolic_percentile: 'pad50' } :
                            { percentile: undefined, systolic_percentile: 'pas50', diastolic_percentile: 'pad50' })
                case (75):
                    filtering = data.filter(item => item.pas_75 === sys)[0]
                    return Promise.resolve(
                        filtering ?
                            { percentile: filtering.percentile, systolic_percentile: 'pas75', diastolic_percentile: 'pad75' } :
                            { percentile: undefined, systolic_percentile: 'pas75', diastolic_percentile: 'pad75' })
                case (90):
                    filtering = data.filter(item => item.pas_90 === sys)[0]
                    return Promise.resolve(
                        filtering ?
                            { percentile: filtering.percentile, systolic_percentile: 'pas90', diastolic_percentile: 'pad90' } :
                            { percentile: undefined, systolic_percentile: 'pas90', diastolic_percentile: 'pad90' })
                case (95):
                    filtering = data.filter(item => item.pas_95 === sys)[0]
                    return Promise.resolve(
                        filtering ?
                            { percentile: filtering.percentile, systolic_percentile: 'pas95', diastolic_percentile: 'pad95' } :
                            { percentile: undefined, systolic_percentile: 'pas95', diastolic_percentile: 'pad95' })
                default:
                    throw Error('Value not mapped for age-height percentile')
            }
        } catch (err) {
            throw new ValidationException('Value not mapped for age-height percentile.',
                `The age-height percentile ${percentile} does not contains relation with the systolic ` +
                `blood pressure ${sys}`)
        }
    }

    private getBloodPressurePercentileClassification(ageHeightPercentile: any): string {
        if (ageHeightPercentile.percentile! < 90) return BloodPressurePercentileClassificationTypes.NORMAL
        else if (90 <= ageHeightPercentile.percentile! && ageHeightPercentile.percentile! < 95)
            return BloodPressurePercentileClassificationTypes.BORDERLINE
        else if (95 <= ageHeightPercentile.percentile! && ageHeightPercentile.percentile! < 99)
            return BloodPressurePercentileClassificationTypes.HYPERTENSION_STAGE_1
        else if (99 <= ageHeightPercentile.percentile) return BloodPressurePercentileClassificationTypes.HYPERTENSION_STAGE_2
        return BloodPressurePercentileClassificationTypes.UNDEFINED
    }

    // Nutritional Counseling Functions
    private async getCounselings(bmi: string, overweight: string, bloodGlucose: string, bloodPressure: string): Promise<any> {
        try {
            const nutritionCounseling: NutritionCounseling = await this._nutritionCounselingRepo.getFile()

            const patientCounselings: any = { bmi_whr: [], glycemia: [], blood_pressure: [] }

            if (bmi === BmiPerAgeClassificationTypes.ACCENTUATED_THINNESS ||
                bmi === BmiPerAgeClassificationTypes.THINNESS) {
                patientCounselings.bmi_whr = nutritionCounseling.thinness_counseling
            } else if (bmi === BmiPerAgeClassificationTypes.EUTROPHY) {
                patientCounselings.bmi_whr = nutritionCounseling.eutrophy_counseling
            } else if (bmi === BmiPerAgeClassificationTypes.OVERWEIGHT ||
                bmi === BmiPerAgeClassificationTypes.OBESITY ||
                bmi === BmiPerAgeClassificationTypes.SEVERE_OBESITY ||
                overweight === OverweightClassificationTypes.OVERWEIGHT_OBESITY_RISK) {
                patientCounselings.bmi_whr = nutritionCounseling.overweight_obesity_counseling
            }
            if (bloodGlucose === BloodGlucoseClassificationTypes.UNDEFINED) {
                patientCounselings.glycemia = nutritionCounseling.insulin_resistance_diabetes_counseling
            }

            if (bloodPressure !== BloodPressurePercentileClassificationTypes.NORMAL) {
                patientCounselings.blood_pressure = nutritionCounseling.hypertension_counseling
            }
            return Promise.resolve(patientCounselings)
        } catch (err) {
            return Promise.reject(err)
        }
    }

}
