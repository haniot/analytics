import { BmiPerAgeClassificationTypes } from './bmi.per.age.classification.types'
import { EvaluationRequest } from '../model/evaluation.request'
import { NutritionEvaluation } from '../model/nutrition.evaluation'
import { NutritionEvaluationStatusTypes } from './nutrition.evaluation.status.types'
import { HeightMeasurement } from '../model/height.measurement'
import { MeasurementTypes } from './measurement.types'
import { WeightMeasurement } from '../model/weight.measurement'
import { BmiPerAge } from './bmi.per.age'
import { NutritionalStatus } from '../model/nutritional.status'
import { WaistCircumferenceMeasurement } from '../model/waist.circumference.measurement'
import { OverweightClassificationTypes } from './overweight.classification.types'
import { OverweightIndicator } from '../model/overweight.indicator'
import { HeartRate } from '../model/heart.rate'
import { DataSetItem } from '../model/data.set.item'
import { BloodGlucose } from '../model/blood.glucose'
import { BloodGlucoseMeasurement } from '../model/blood.glucose.measurement'
import { Zone } from '../model/zone'
import { BloodGlucoseZones } from './blood.glucose.zones'
import { BloodGlucoseClassificationTypes } from './blood.glucose.classification.types'
import { NutritionCounseling } from './nutrition.counseling'
import { BloodPressure } from '../model/blood.pressure'

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
     * Get age from patient by a birth date.
     * @param birthDate patient's birth date, in DATE format (ISO Format)
     * @return the patient's age value.
     */
    private getAgeFromBirthDate(birthDate: string): string {
        const dateNow = new Date() // date now
        const dateBirth = new Date(birthDate) // birth date in Date format
        const totalOfMonths = (dateNow.getFullYear() - dateBirth.getFullYear()) * 12 + (dateNow.getMonth() - dateBirth.getMonth())
        const yearsLived = Math.floor(totalOfMonths / 12)
        const monthsLived = totalOfMonths % 12
        return `${yearsLived}a`.concat(monthsLived > 0 ? `${monthsLived}m` : '')
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
        if (bmi < percentile.p01) return { percentile: 'p01', result: BmiPerAgeClassificationTypes.ACCENTUATED_THINNESS }
        else if (percentile.p01 < bmi && bmi < percentile.p3) return {
            percentile: 'p3',
            result: BmiPerAgeClassificationTypes.THINNESS
        }
        else if (percentile.p3 < bmi && bmi < percentile.p85) return {
            percentile: 'p85',
            result: BmiPerAgeClassificationTypes.EUTROPHY
        }
        else if (percentile.p85 < bmi && bmi < percentile.p97) return {
            percentile: 'p97',
            result: BmiPerAgeClassificationTypes.OVERWEIGHT
        }
        else if (percentile.p97 < bmi && bmi < percentile.p999) return {
            percentile: 'p99',
            result: BmiPerAgeClassificationTypes.OBESITY
        }
        else return { percentile: 'p99', result: BmiPerAgeClassificationTypes.SEVERE_OBESITY }
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
    private getDataSetGoals(dataSet: Array<DataSetItem>): any {
        let minValue = dataSet[0].value!
        let maxValue = dataSet[0].value!
        let avrg = 0
        dataSet.forEach(item => {
            if (item.value! < minValue) minValue = item.value!
            else if (item.value! > maxValue) maxValue = item.value!
            avrg += item.value!
        })

        return {
            min: minValue,
            max: maxValue,
            average: Math.round(avrg / dataSet.length),
            dataset: dataSet
        }
    }

    /**
     * Get the blood glucose classification.
     * @param bloodGlucose the blood glucose measurement object
     * @return the blood glucose classification
     */
    private getBloodGlucoseClassification(bloodGlucose: BloodGlucoseMeasurement): string {
        const bloodGlucoseLevels = BloodGlucoseZones.zones[bloodGlucose.meal!]
        if (bloodGlucoseLevels.good.min < bloodGlucose.value! && bloodGlucose.value! < bloodGlucoseLevels.good.max) {
            return BloodGlucoseClassificationTypes.GOOD
        } else if (bloodGlucoseLevels.great.min < bloodGlucose.value! && bloodGlucose.value! < bloodGlucoseLevels.great.max) {
            return BloodGlucoseClassificationTypes.GREAT
        }
        return BloodGlucoseClassificationTypes.UNDEFINED
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

            /* Get evaluation request values to do the evaluation*/
            const height: HeightMeasurement = item.measurements!.filter(value => value.type === MeasurementTypes.HEIGHT)[0]
            const weight: WeightMeasurement = item.measurements!.filter(value => value.type === MeasurementTypes.WEIGHT)[0]
            const waist: WaistCircumferenceMeasurement =
                item.measurements!.filter(value => value.type === MeasurementTypes.WAIST_CIRCUMFERENCE)[0]
            const heartRate: HeartRate = item.measurements!.filter(value => value.type === MeasurementTypes.HEART_RATE)[0]
            const bloodGlucose: BloodGlucoseMeasurement =
                item.measurements!.filter(value => value.type === MeasurementTypes.BLOOD_GLUCOSE)[0]
            const birthDate: string = item.patient && item.patient.birth_date ? item.patient.birth_date : ''

            /* Calculate patient data based on the measurements */
            const patientBmi = this.calculateBmi(weight.value!, height.value!)
            const patientBmiPercentile =
                this.getBmiPerAgeClassification(
                    patientBmi, await this.getBmiPercentileFromAge(this.getAgeFromBirthDate(birthDate), item.patient!.gender!))
            const patientWaistHeightRelation = this.getWaistHeightRelation(waist.value!, height.value!)
            const patientDataSetGoals = this.getDataSetGoals(heartRate.dataset!)

            /* Setting Evaluation parameters before save.*/
            evaluation.status = NutritionEvaluationStatusTypes.INCOMPLETE
            evaluation.patient_id = item.patient && item.patient.id ? item.patient.id : undefined
            evaluation.pilotstudy_id = item.pilotstudy_id ? item.pilotstudy_id : undefined
            evaluation.health_professional_id = item.health_professional_id ? item.health_professional_id : undefined
            evaluation.patient_id = item.patient!.id
            evaluation.nutritional_status = new NutritionalStatus().fromJSON({
                bmi: patientBmi,
                percentile: patientBmiPercentile.percentile,
                classification: patientBmiPercentile.result
            })
            evaluation.overweight_indicator = new OverweightIndicator().fromJSON({
                waist_height_relation: patientWaistHeightRelation,
                classification: this.getOverweightIndicator(patientWaistHeightRelation)
            })
            evaluation.heart_rate = new HeartRate().fromJSON(patientDataSetGoals)
            evaluation.blood_glucose = new BloodGlucose().fromJSON({
                value: bloodGlucose.value,
                meal: bloodGlucose.meal,
                classification: this.getBloodGlucoseClassification(bloodGlucose),
                zones: [new Zone().fromJSON(BloodGlucoseZones.zones)]
            })

            // TODO Blood pressure logic
            evaluation.blood_pressure = new BloodPressure().fromJSON({
                systolic: 80,
                diastolic: 60,
                systolic_percentile: 'PAS5',
                diastolic_percentile: 'PAD5',
                classification: 'normal'
            })

            const counselings = await new NutritionCounseling().toJSON()

            if (evaluation.nutritional_status.classification === BmiPerAgeClassificationTypes.OVERWEIGHT ||
                evaluation.nutritional_status.classification === BmiPerAgeClassificationTypes.OBESITY ||
                evaluation.nutritional_status.classification === BmiPerAgeClassificationTypes.SEVERE_OBESITY ||
                evaluation.overweight_indicator.classification === OverweightClassificationTypes.OVERWEIGHT_OBESITY_RISK) {
                evaluation.counseling = counselings.overweight_obesity_counseling
            }

            /* Return the complete evaluation */
            return Promise.resolve(evaluation)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
