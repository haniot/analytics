import { inject, injectable } from 'inversify'
import { INutritionEvaluationService } from '../port/nutrition.evaluation.service.interface'
import { IQuery } from '../port/query.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationRepository } from '../port/nutrition.evaluation.repository.interface'
import { EvaluationTypes } from '../domain/utils/evaluation.types'
import { NutritionEvaluationRequest } from '../domain/model/nutrition.evaluation.request'
import { EvaluationRequestValidator } from '../domain/validator/evaluation.request.validator'
import { CreateNutritionalEvaluationValidator } from '../domain/validator/create.nutritional.evaluation.validator'
import { NutritionalCouncil } from '../domain/model/nutritional.council'
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
import { NutritionalStatus } from '../domain/model/nutritional.status'
import { BmiPerAgeRepository } from '../../infrastructure/repository/bmi.per.age.repository'
import { OverweightIndicator } from '../domain/model/overweight.indicator'
import { HeartRate } from '../domain/model/heart.rate'
import { BloodGlucose } from '../domain/model/blood.glucose'
import { Zone } from '../domain/model/zone'
import { Counseling } from '../domain/model/counseling'
import { NutritionalCounselingRepository } from '../../infrastructure/repository/nutritional.counseling.repository'
import { NutritionCounseling } from '../domain/model/nutrition.counseling'
import { BloodPressurePercentileClassificationTypes } from '../domain/utils/blood.pressure.percentile.classification.types'
import { BloodPressure } from '../domain/model/blood.pressure'
import { AgeHeightPercentile } from '../domain/model/age.height.percentile'
import { BloodPressurePerAgeHeight } from '../domain/model/blood.pressure.per.age.height'
import { BloodPressurePerAgeHeightRepository } from '../../infrastructure/repository/blood.pressure.per.age.height.repository'
import { GenderTypes } from '../domain/utils/gender.types'
import { ValidationException } from '../domain/exception/validation.exception'
import { BloodPressurePerSysDiasRepository } from '../../infrastructure/repository/blood.pressure.per.sys.dias.repository'
import { BloodPressurePerSysDias } from '../domain/model/blood.pressure.per.sys.dias'

@injectable()
export class NutritionEvaluationService implements INutritionEvaluationService {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_REPOSITORY) private readonly _repo: INutritionEvaluationRepository
    ) {
    }

    public add(item: any): Promise<NutritionEvaluation> {
        throw Error('Not implemented!')
    }

    public getAll(query: IQuery): Promise<Array<NutritionEvaluation>> {
        query.addFilter({ type: EvaluationTypes.NUTRITION })
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<NutritionEvaluation> {
        try {
            ObjectIdValidator.validate(id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: EvaluationTypes.NUTRITION })
        return this._repo.findOne(query)
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented!')
    }

    public update(item: NutritionEvaluation): Promise<NutritionEvaluation> {
        throw Error('Not implemented!')
    }

    public async addEvaluation(item: NutritionEvaluationRequest): Promise<NutritionEvaluation> {
        try {
            EvaluationRequestValidator.validate(item)
            const evaluation: NutritionEvaluation = await this.generateEvaluation(item)
            CreateNutritionalEvaluationValidator.validate(evaluation)
            return this._repo.create(evaluation)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    public async updateNutritionalCounseling(patientId: string, evaluationId: string, counseling: NutritionalCouncil):
        Promise<NutritionEvaluation> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(evaluationId)
            const nutritionEvaluation: NutritionEvaluation =
                await this.getById(evaluationId, new Query().fromJSON({ filters: { 'patient.id': patientId } }))
            if (!nutritionEvaluation) return Promise.resolve(undefined!)
            nutritionEvaluation.counseling!.definitive = counseling
            nutritionEvaluation.status = NutritionEvaluationStatusTypes.COMPLETE
            return await this._repo.update(nutritionEvaluation)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    public async removeEvaluation(patientId: string, evaluationId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(evaluationId)
            return await this._repo.delete(evaluationId)
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
            result.nutritional_status = new NutritionalStatus().fromJSON({
                height: info.measurements.height,
                weight: info.measurements.weight,
                bmi: info.evaluation.bmi.value,
                percentile: this.getBmiPerAgeClassification(info.evaluation.bmi.value, info.evaluation.bmi.percentile)
                    .percentile,
                classification: this.getBmiPerAgeClassification(info.evaluation.bmi.value, info.evaluation.bmi.percentile)
                    .classification
            })

            // Set Overweight Indicator
            result.overweight_indicator = new OverweightIndicator().fromJSON({
                waist_circumference: info.measurements.waist_circumference,
                height: info.measurements.height,
                waist_height_relation: info.evaluation.waist_height_relation.value,
                classification: info.evaluation.waist_height_relation.value < 0.5 ?
                    OverweightClassificationTypes.NORMAL : OverweightClassificationTypes.OVERWEIGHT_OBESITY_RISK

            })

            // Set Heart Rate
            result.heart_rate = new HeartRate().fromJSON(this.getHeartRateDataSetGoals(info.measurements.heart_rate))

            // Set Blood Glucose
            result.blood_glucose = new BloodGlucose().fromJSON({
                value: info.measurements.blood_glucose.value,
                meal: info.measurements.blood_glucose.meal,
                classification: this.getBloodGlucoseClassification(info.measurements.blood_glucose),
                zones: [new Zone().fromJSON(BloodGlucoseZones.zones)]
            })

            // Set Blood Pressure
            result.blood_pressure = new BloodPressure().fromJSON({
                systolic: info.measurements.blood_pressure.systolic,
                diastolic: info.measurements.blood_pressure.diastolic,
                systolic_percentile: info.evaluation.blood_pressure.percentile.systolic_percentile,
                diastolic_percentile: info.evaluation.blood_pressure.percentile.diastolic_percentile,
                classification: this.getBloodPressurePercentileClassification(info.evaluation.blood_pressure.percentile)
            })

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

            const bmiPerAge: BmiPerAge = await new BmiPerAgeRepository().getBmiPerAge()
            const patientAge: any = DateUtils.getAgeFromBirthDate(patient.birth_date)
            const patientAgeHeightPercentile =
                await this.getBloodPressureAgeHeightPercentile(patientAge.age, height.value, patient.gender)

            const result = {
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
                evaluation: {
                    bmi: {
                        value: this.getBmiPerWeightHeight(weight.value, height.value),
                        percentile: this.getBmiPercentileFromAgeGender(bmiPerAge, patientAge.age_with_months, patient.gender)
                    },
                    waist_height_relation: {
                        value: this.getWaistHeightRelation(waist_circumference.value, height.value)
                    },
                    blood_pressure: {
                        percentile: await this.getBloodPressurePercentile(
                            patient.gender,
                            patientAge.age,
                            patientAgeHeightPercentile.percentile!,
                            blood_pressure.systolic
                        )
                    }
                },
                pilotstudy_id: request.pilotstudy_id,
                health_professional_id: request.health_professional_id
            }

            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    // BMI Functions
    private getBmiPerWeightHeight(weight: number, height: number): number {
        return parseFloat((weight / Math.pow((height / 100), 2)).toFixed(1))
    }

    private getBmiPercentileFromAgeGender(bmiPerAge: BmiPerAge, age: string, gender: string): AgeBmiPercentile {
        if (gender === 'male') return bmiPerAge.bmi_per_age_boys!.filter(value => value.age === age)[0]
        return bmiPerAge.bmi_per_age_girls!.filter(value => value.age === age)[0]
    }

    private getBmiPerAgeClassification(bmi: number, percentile: any): any {
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
    private getWaistHeightRelation(waist: number, height: number) {
        return parseFloat((waist / height).toFixed(2))
    }

    // Heart Rate Functions
    private getHeartRateDataSetGoals(dataSet: Array<any>): any {
        return {
            min: dataSet.reduce((min, item) => Math.min(min, item.value), dataSet[0].value),
            max: dataSet.reduce((max, item) => Math.max(max, item.value), dataSet[0].value),
            average: Math.round(
                dataSet
                    .map(item => item.value)
                    .reduce((prev, curr) => prev + curr) / dataSet.length),
            dataset: dataSet
        }
    }

    // Blood Glucose Functions
    private getBloodGlucoseClassification(bloodGlucose: any): string {
        const bloodGlucoseLevels = BloodGlucoseZones.zones[bloodGlucose.meal]
        if (bloodGlucoseLevels.good.min < bloodGlucose.value && bloodGlucose.value < bloodGlucoseLevels.good.max) {
            return BloodGlucoseClassificationTypes.GOOD
        } else if (bloodGlucoseLevels.great.min < bloodGlucose.value && bloodGlucose.value < bloodGlucoseLevels.great.max) {
            return BloodGlucoseClassificationTypes.GREAT
        }
        return BloodGlucoseClassificationTypes.UNDEFINED
    }

    // Blood Pressure Functions

    private async getBloodPressurePercentile(gender: string, age: number, percentile: number, sys: number): Promise<any> {
        const bloodPressurePerSysDias: BloodPressurePerSysDias =
            await new BloodPressurePerSysDiasRepository().getBloodPressurePerAgeHeight()
        let data = bloodPressurePerSysDias.age_systolic_diastolic_percentile_boys!.filter(item => item.age === age)
        if (gender === GenderTypes.FEMALE) {
            data = bloodPressurePerSysDias.age_systolic_diastolic_percentile_girls!.filter(item => item.age === age)
        }

        let result

        try {
            switch (percentile) {
                case (5):
                    result = data.filter(item => item.age === age && item.pas_5 === sys)[0]
                    return Promise.resolve({
                        percentile: result.percentile,
                        systolic_percentile: 'pas5',
                        diastolic_percentile: 'pad5'
                    })
                case (10):
                    result = data.filter(item => item.pas_10 === sys)[0]
                    return Promise.resolve({
                        percentile: result.percentile,
                        systolic_percentile: 'pas10',
                        diastolic_percentile: 'pad10'
                    })
                case (25):
                    result = data.filter(item => item.pas_25 === sys)[0]
                    return Promise.resolve({
                        percentile: result.percentile,
                        systolic_percentile: 'pas25',
                        diastolic_percentile: 'pad25'
                    })
                case (50):
                    result = data.filter(item => item.pas_50 === sys)[0]
                    return Promise.resolve({
                        percentile: result.percentile,
                        systolic_percentile: 'pas50',
                        diastolic_percentile: 'pad50'
                    })
                case (75):
                    result = data.filter(item => item.pas_75 === sys)[0]
                    return Promise.resolve({
                        percentile: result.percentile,
                        systolic_percentile: 'pas75',
                        diastolic_percentile: 'pad75'
                    })
                case (90):
                    result = data.filter(item => item.pas_90 === sys)[0]
                    return Promise.resolve({
                        percentile: result.percentile,
                        systolic_percentile: 'pas90',
                        diastolic_percentile: 'pad90'
                    })
                case (95):
                    result = data.filter(item => item.pas_95 === sys)[0]
                    return Promise.resolve({
                        percentile: result.percentile,
                        systolic_percentile: 'pas95',
                        diastolic_percentile: 'pad95'
                    })
                default:
                    throw Error('Value not mapped for age-height percentile')
            }
        } catch (err) {
            throw new ValidationException('Value not mapped for age-height percentile.',
                `The age-height percentile ${percentile} does not contains relation with the systolic ` +
                `blood pressure ${sys}`)
        }
    }

    private async getBloodPressureAgeHeightPercentile(age: number, height: number, gender: string): Promise<AgeHeightPercentile> {
        try {
            const bloodPressurePerAgeHeight: BloodPressurePerAgeHeight =
                await new BloodPressurePerAgeHeightRepository().getBloodPressurePerAgeHeight()
            if (gender === GenderTypes.MALE) {
                return Promise.resolve(
                    await bloodPressurePerAgeHeight.blood_pressure_per_age_boys!
                        .filter(item => item.age === age && item.height === height)[0])
            }
            return Promise.resolve(
                await bloodPressurePerAgeHeight.blood_pressure_per_age_girls!
                    .filter(item => item.age === age && item.height === height)[0])
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private getBloodPressurePercentileClassification(ageHeightPercentile: AgeHeightPercentile): string {
        if (ageHeightPercentile.percentile! < 90) return BloodPressurePercentileClassificationTypes.NORMAL
        else if (90 <= ageHeightPercentile.percentile! && ageHeightPercentile.percentile! < 95)
            return BloodPressurePercentileClassificationTypes.BORDERLINE
        else if (95 <= ageHeightPercentile.percentile! && ageHeightPercentile.percentile! < 99)
            return BloodPressurePercentileClassificationTypes.HYPERTENSION_STAGE_1
        return BloodPressurePercentileClassificationTypes.HYPERTENSION_STAGE_2
    }

    // Nutritional Counseling Functions
    private async getCounselings(bmi: string, overweight: string, bloodGlucose: string, bloodPressure: string): Promise<any> {
        try {
            const nutritionCounseling: NutritionCounseling =
                await new NutritionalCounselingRepository().getNutritionalCounseling()

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
