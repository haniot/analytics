import { BmiPerAgeClassificationTypes } from './bmi.per.age.classification.types'
import { EvaluationRequest } from '../model/evaluation.request'
import { NutritionEvaluation } from '../model/nutrition.evaluation'
import { NutritionEvaluationStatusTypes } from './nutrition.evaluation.status.types'
import { MeasurementTypes } from './measurement.types'
import { BmiPerAge } from './bmi.per.age'
import { NutritionalStatus } from '../model/nutritional.status'
import { OverweightClassificationTypes } from './overweight.classification.types'
import { OverweightIndicator } from '../model/overweight.indicator'
import { HeartRate } from '../model/heart.rate'
import { BloodGlucose } from '../model/blood.glucose'
import { Zone } from '../model/zone'
import { BloodGlucoseZones } from './blood.glucose.zones'
import { BloodGlucoseClassificationTypes } from './blood.glucose.classification.types'
import { BloodPressure } from '../model/blood.pressure'
import { BloodPressurePerAge } from './blood.pressure.per.age'
import { ValidationException } from '../exception/validation.exception'
import { BloodPressurePercentileClassificationTypes } from './blood.pressure.percentile.classification.types'
import { GenderTypes } from './gender.types'
import { Counseling } from '../model/counseling'
import { NutritionCounseling } from './nutrition.counseling'
import { BloodPressurePerAgeClassificationTypes } from './blood.pressure.per.age.classification.types'

export class EvaluationUtils {

    /**
     * Calculate the BMI from patient.
     * @param weight value of patient weight
     * @param height value of patient height
     * @return the BMI value.
     */
    private calculateBmi(weight: number, height: number): number {
        return parseFloat((weight / Math.pow((height / 100), 2)).toFixed(1))
    }

    /**
     * Calculate the Waist-Height relation.
     * @param waist value of patient waist circumference
     * @param height value of patient height
     * @return the waist-height relation value
     */
    private getWaistHeightRelation(waist: number, height: number): number {
        return parseFloat((waist / height).toFixed(2))
    }

    /**
     * Get age from patient by a birth date with month.
     * @param birthDate patient's birth date, in DATE format (ISO Format)
     * @return the patient's age value.
     */
    private getAgeFromBirthDateWithMonth(birthDate: string): string {
        const dateNow = new Date() // date now
        const dateBirth = new Date(birthDate) // birth date in Date format
        const totalOfMonths = (dateNow.getFullYear() - dateBirth.getFullYear()) * 12 + (dateNow.getMonth() - dateBirth.getMonth())
        const yearsLived = Math.floor(totalOfMonths / 12)
        const monthsLived = totalOfMonths % 12
        return `${yearsLived}a`.concat(monthsLived > 0 ? `${monthsLived}m` : '')
    }

    /**
     * Get age from patient by a birth date.
     * @param birthDate patient's birth date, in DATE format (ISO Format)
     * @return the patient's age value.
     */
    private getAgeFromBirthDate(birthDate: string): number {
        const dateNow = new Date() // date now
        const dateBirth = new Date(birthDate) // birth date in Date format
        const totalOfMonths = (dateNow.getFullYear() - dateBirth.getFullYear()) * 12 + (dateNow.getMonth() - dateBirth.getMonth())
        return Math.floor(totalOfMonths / 12)
    }

    /**
     * Get the overweight indicator, by the waist-height relation.
     * If the value is greater than 0.5, it means that patient probably is overweight.
     * Otherwise, the patient have a normal weight.
     * @param waistHeightRelation the waist-height relation.
     * @return the overweight classification.
     */
    private getOverweightIndicator(waistHeightRelation: number): string {
        if (waistHeightRelation < 0.5) return OverweightClassificationTypes.NORMAL
        return OverweightClassificationTypes.OVERWEIGHT_OBESITY_RISK
    }

    /**
     * Get BMI classification from patient, according to the age.
     * The classification follows the OMS table for BMI x Age relation. Follow on:
     * @param bmi the patient bmi
     * @param percentile the percentile of patient, based on the age
     * @return the percentile and the patient's classification of bmi-per age relation.
     */
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

    /**
     * Get the percentile based on patient age.
     * @param age the age of patient
     * @param gender the gender of the patient
     * @return the percentile classifications based on age
     */
    private async getBmiPercentileFromAge(age: string, gender: string) {
        const bmiPerAge = await new BmiPerAge().toJSON()
        if (gender === 'male') return await bmiPerAge.bmi_per_age_boys.filter(value => value.age === age)[0].percentile
        return await bmiPerAge.bmi_per_age_girls.filter(value => value.age === age)[0].percentile
    }

    /**
     * Get the min, max and average value from heart rate dataset.
     * @param dataSet the list of heart rate measurements
     * @return the min, max, average and the dataset
     */
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

    /**
     * Get the blood glucose classification.
     * @param bloodGlucose the blood glucose measurement object
     * @return the blood glucose classification
     */
    private getBloodGlucoseClassification(bloodGlucose: any): string {
        const bloodGlucoseLevels = BloodGlucoseZones.zones[bloodGlucose.meal]
        if (bloodGlucoseLevels.good.min < bloodGlucose.value && bloodGlucose.value < bloodGlucoseLevels.good.max) {
            return BloodGlucoseClassificationTypes.GOOD
        } else if (bloodGlucoseLevels.great.min < bloodGlucose.value && bloodGlucose.value < bloodGlucoseLevels.great.max) {
            return BloodGlucoseClassificationTypes.GREAT
        }
        return BloodGlucoseClassificationTypes.UNDEFINED
    }

    /**
     * Get the percentile from age and height relation.
     * @param data data reference for age and height percentile relation
     * @param age age of the patient
     * @param height height of the patient
     * @param gender gender of the patient
     * @return the percentile from age and height relation
     */
    private getAgeHeightPercentile(data: Array<any>, age: number, height: number, gender: string): number {
        if (gender === 'male') {
            return data.filter(item => item.age === age && item.height === height)[0].percentile
        }
        return data.filter(item => item.age === age && item.height === height)[0].percentile
    }

    /**
     * Get the percentiles list from systolic/diastolic pressure by a age.
     * @param data data reference for systolic/diastolic pressure and age relation
     * @param gender gender of patient
     * @param age age of patient
     * @return a list of systolic/diastolic pressure percentiles by a age.
     */
    private getSystolicDiastolicPercentilesByAge(data: Array<any>, gender: string, age: number): Array<any> {
        if (gender === 'male') return data.filter(item => item.age === age)
        return data.filter(item => item.age === age)
    }

    /**
     * Get the blood pressure percentile based on systolic/diastolic percentiles from an age.
     * @param data data reference for systolic/diastolic percentiles from an age.
     * @param ageHeightPercentile percentile from age-height relation
     * @param sys systolic pressure value
     * @return The blood pressure percentile based on systolic/diastolic percentiles from age.
     * @throws validation error if the age-height percentile does not were in range or if the systolic/diastolic
     * pressure percentile by age is not found on reference.
     */
    private getBloodPressurePercentile(
        data: Array<any>, ageHeightPercentile: number, sys: number): any {
        let result
        try {
            switch (ageHeightPercentile) {
                case (5):
                    result = data.filter(item => item.pas_5 === sys)[0]
                    return {
                        percentile: result.percentile,
                        systolic_percentile: result.pas_5,
                        diastolic_percentile: result.pad_5
                    }
                case (10):
                    result = data.filter(item => item.pas_10 === sys)[0]
                    return {
                        percentile: result.percentile,
                        systolic_percentile: result.pas_10,
                        diastolic_percentile: result.pas_10
                    }
                case (25):
                    result = data.filter(item => item.pas_25 === sys)[0]
                    return {
                        percentile: result.percentile,
                        systolic_percentile: result.pas_25,
                        diastolic_percentile: result.pad_25
                    }
                case (50):
                    result = data.filter(item => item.pas_50 === sys)[0]
                    return {
                        percentile: result.percentile,
                        systolic_percentile: result.pas_50,
                        diastolic_percentile: result.pad_50
                    }
                case (75):
                    result = data.filter(item => item.pas_75 === sys)[0]
                    return {
                        percentile: result.percentile,
                        systolic_percentile: result.pas_75,
                        diastolic_percentile: result.pad_75
                    }
                case (90):
                    result = data.filter(item => item.pas_90 === sys)[0]
                    return {
                        percentile: result.percentile,
                        systolic_percentile: result.pas_90,
                        diastolic_percentile: result.pad_90
                    }
                case (95):
                    result = data.filter(item => item.pas_95 === sys)[0]
                    return {
                        percentile: result.percentile,
                        systolic_percentile: result.pas_95,
                        diastolic_percentile: result.pad_95
                    }
                default:
                    return Promise.resolve(0)
            }
        } catch (err) {
            throw new ValidationException('Value not mapped for age-height percentile.',
                `The age-height percentile ${ageHeightPercentile} does not contains relation with the systolic ` +
                `blood pressure ${sys}`)
        }
    }

    /**
     *  /**
     * Get the blood pressure percentile classification by your value.
     * @param ageHeightData
     * @param sysDiaData list of Systolic-Diastolic blood pressure values relation with their percentiles.
     * @param age age of the patient
     * @param height height of the patient
     * @param gender gender of the patient
     * @param sys systolic blood pressure from patient
     * @param dia diastolic blood pressure from patient
     * @return a string that contains the classification
     */
    private async getBloodPressurePercentileClassification(
        ageHeightData: Array<any>, sysDiaData: Array<any>, age: number, height: number, gender: string, sys: number, dia: number):
        Promise<any> {
        const ageHeightPercentile = this.getAgeHeightPercentile(ageHeightData, age, height, gender)
        const sysDiasPercentiles = this.getSystolicDiastolicPercentilesByAge(sysDiaData, gender, age)
        const patientPercentile = await this.getBloodPressurePercentile(sysDiasPercentiles, ageHeightPercentile, sys)

        const result = {
            percentile: patientPercentile.percentile,
            systolic_percentile: patientPercentile.systolic_percentile,
            diastolic_percentile: patientPercentile.diastolic_percentile,
            classification: BloodPressurePercentileClassificationTypes.HYPERTENSION_STAGE_2
        }
        if (patientPercentile.percentile < 90) result.classification = BloodPressurePercentileClassificationTypes.NORMAL
        else if (90 <= patientPercentile.percentile && patientPercentile.percentile < 95)
            result.classification = BloodPressurePercentileClassificationTypes.BORDERLINE
        else if (95 <= patientPercentile.percentile && patientPercentile.percentile < 99)
            result.classification = BloodPressurePercentileClassificationTypes.HYPERTENSION_STAGE_1
        return result
    }

    /**
     * Function used to generate evaluation, by the data passed in evaluation request.
     * @param item, the evaluation request data
     * @return the nutrition evaluation object
     * @throws some error that occurs during the process
     */
    public async generateEvaluation(item: EvaluationRequest): Promise<NutritionEvaluation> {
        try {
            const evaluation: NutritionEvaluation = new NutritionEvaluation()

            /* Get request values to do the evaluation*/
            const evaluationData: any = this.getNutritionalEvaluationInformation(item)

            /* Calculate patient evaluation data based on the measurements */
            const patientBmi = this.calculateBmi(evaluationData.weight, evaluationData.height)
            const patientBmiPercentilePerAge =
                await this.getBmiPercentileFromAge(evaluationData.patient.age_with_month, evaluationData.patient.gender)
            const patientBmiPercentile = this.getBmiPerAgeClassification(patientBmi, patientBmiPercentilePerAge)
            const patientWaistHeightRelation =
                this.getWaistHeightRelation(evaluationData.waist_circumference, evaluationData.height)
            const patientDataSetGoals = this.getHeartRateDataSetGoals(evaluationData.heart_rate_dataset)
            const bloodPressureData =
                await new BloodPressurePerAge()
                    .toJSON(evaluationData.patient.gender === GenderTypes.MALE ? GenderTypes.MALE : GenderTypes.FEMALE)
            const patientOverweightIndicator = this.getOverweightIndicator(patientWaistHeightRelation)
            const patientBloodGlucoseClassification = this.getBloodGlucoseClassification(evaluationData.blood_glucose)
            const patientBloodPressureClassification =
                await this.getBloodPressurePercentileClassification(
                    bloodPressureData.blood_pressure_per_age_height,
                    bloodPressureData.blood_pressure_per_sys_dias,
                    evaluationData.patient.age,
                    evaluationData.height,
                    evaluationData.patient.gender,
                    evaluationData.blood_pressure.systolic,
                    evaluationData.blood_pressure.diastolic)

            /* Get nutritional counselings based on patient evaluation data */
            const nutritionCounselings = await new NutritionCounseling().toJSON()
            const patientCounselings = { bmi_whr: [], glycemia: [], blood_pressure: [] }

            if (patientBmiPercentile.classification === BmiPerAgeClassificationTypes.ACCENTUATED_THINNESS ||
                patientBmiPercentile.classification === BmiPerAgeClassificationTypes.THINNESS) {
                patientCounselings.bmi_whr = nutritionCounselings.thinness_counseling
            } else if (patientBmiPercentile.classification === BmiPerAgeClassificationTypes.EUTROPHY) {
                patientCounselings.bmi_whr = nutritionCounselings.eutrophy_counseling
            } else if (patientBmiPercentile.classification === BmiPerAgeClassificationTypes.OVERWEIGHT ||
                patientBmiPercentile.classification === BmiPerAgeClassificationTypes.OBESITY ||
                patientBmiPercentile.classification === BmiPerAgeClassificationTypes.SEVERE_OBESITY ||
                patientOverweightIndicator === OverweightClassificationTypes.OVERWEIGHT_OBESITY_RISK) {
                patientCounselings.bmi_whr = nutritionCounselings.overweight_obesity_counseling
            }

            if (patientBloodGlucoseClassification === BloodGlucoseClassificationTypes.UNDEFINED) {
                patientCounselings.glycemia = nutritionCounselings.insulin_resistance_diabetes_counseling
            }

            if (patientBloodPressureClassification.classification !== BloodPressurePerAgeClassificationTypes.NORMAL) {
                patientCounselings.blood_pressure = nutritionCounselings.hypertension_counseling
            }

            /*Set evaluation by the patient evaluation data and measurements*/
            evaluation.status = NutritionEvaluationStatusTypes.INCOMPLETE
            evaluation.patient_id = evaluationData.patient.id
            evaluation.pilotstudy_id = evaluationData.pilotstudy_id
            evaluation.health_professional_id = evaluationData.health_professional_id
            evaluation.nutritional_status = new NutritionalStatus().fromJSON({
                height: evaluationData.height,
                weight: evaluationData.weight,
                bmi: patientBmi,
                percentile: patientBmiPercentile.percentile,
                classification: patientBmiPercentile.classification
            })
            evaluation.overweight_indicator = new OverweightIndicator().fromJSON({
                waist_circumference: evaluationData.waist_circumference,
                height: evaluationData.height,
                waist_height_relation: patientWaistHeightRelation,
                classification: patientOverweightIndicator
            })
            evaluation.heart_rate = new HeartRate().fromJSON(patientDataSetGoals)
            evaluation.blood_glucose = new BloodGlucose().fromJSON({
                value: evaluationData.blood_glucose.value,
                meal: evaluationData.blood_glucose.meal,
                classification: patientBloodGlucoseClassification,
                zones: [new Zone().fromJSON(BloodGlucoseZones.zones)]
            })
            evaluation.blood_pressure = new BloodPressure().fromJSON({
                systolic: evaluationData.blood_pressure.systolic,
                diastolic: evaluationData.blood_pressure.diastolic,
                systolic_percentile: patientBloodPressureClassification.systolic_percentile,
                diastolic_percentile: patientBloodPressureClassification.diastolic_percentile,
                classification: patientBloodPressureClassification.classification
            })
            evaluation.counseling = new Counseling().fromJSON({ suggested: patientCounselings })
            evaluation.measurements = item.measurements
            evaluation.physical_activity_habits = item.physical_activity_habits
            evaluation.feeding_habits_record = item.feeding_habits_record
            evaluation.medical_record = item.medical_record
            evaluation.created_at = new Date().toISOString()
            /* Return the complete evaluation */
            return Promise.resolve(evaluation)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private getNutritionalEvaluationInformation(request: EvaluationRequest): any {
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

        return {
            patient: {
                id: patient.id,
                age: this.getAgeFromBirthDate(patient.birth_date),
                age_with_month: this.getAgeFromBirthDateWithMonth(patient.birth_date),
                gender: patient.gender
            },
            height: height.value,
            weight: weight.value,
            heart_rate_dataset: heart_rate.dataset,
            blood_glucose: {
                value: blood_glucose.value,
                meal: blood_glucose.meal
            },
            blood_pressure: {
                systolic: blood_pressure.systolic,
                diastolic: blood_pressure.diastolic
            },
            waist_circumference: waist_circumference.value,
            pilotstudy_id: request.pilotstudy_id!,
            health_professional_id: request.health_professional_id
        }
    }
}
