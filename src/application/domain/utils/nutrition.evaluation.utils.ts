import { BmiPerAgeClassificationTypes } from './bmi.per.age.classification.types'
import { EvaluationRequest } from '../model/evaluation.request'
import { NutritionEvaluation } from '../model/nutrition.evaluation'
import { NutritionEvaluationStatusTypes } from './nutrition.evaluation.status.types'
import { Height } from '../model/measurements/height'
import { MeasurementTypes } from './measurement.types'
import { Weight } from '../model/measurements/weight'
import { BmiPerAge } from './bmi.per.age'
import { NutritionalStatus } from '../model/nutritional.status'
import { WaistCircumference } from '../model/measurements/waist.circumference'
import { OverweightClassificationTypes } from './overweight.classification.types'
import { OverweightIndicator } from '../model/overweight.indicator'

export class NutritionEvaluationUtils {

    private calculateBmi(weight: number, height: number): number {
        return parseFloat((weight / Math.pow((height / 100), 2)).toFixed(1))
    }

    private getWaistHeightRelation(waist: number, height: number): number {
        return parseFloat((waist / height).toFixed(2))
    }

    private getAgeFromBirthDate(birthDate: string): string {
        const dateNow = new Date() // date now
        const dateBirth = new Date(birthDate) // birth date in Date format
        const totalOfMonths = (dateNow.getFullYear() - dateBirth.getFullYear()) * 12 + (dateNow.getMonth() - dateBirth.getMonth())
        const yearsLived = Math.floor(totalOfMonths / 12)
        const monthsLived = totalOfMonths % 12
        return `${yearsLived}a`.concat(monthsLived > 0 ? `${monthsLived}m` : '')
    }

    private getOverweightIndicator(waistHeightRelation: number): string {
        if (waistHeightRelation < 0.5) return OverweightClassificationTypes.NORMAL
        return OverweightClassificationTypes.OVERWEIGHT_OBESITY_RISK
    }

    private getBmiPerAgeClassification(bmi: number, percentile: any): string {
        if (bmi < percentile.p01) return BmiPerAgeClassificationTypes.ACCENTUATED_THINNESS
        else if (percentile.p01 < bmi && bmi < percentile.p3) return BmiPerAgeClassificationTypes.THINNESS
        else if (percentile.p3 < bmi && bmi < percentile.p85) return BmiPerAgeClassificationTypes.EUTROPHY
        else if (percentile.p85 < bmi && bmi < percentile.p97) return BmiPerAgeClassificationTypes.OVERWEIGHT
        else if (percentile.p97 < bmi && bmi < percentile.p999) return BmiPerAgeClassificationTypes.OBESITY
        else return BmiPerAgeClassificationTypes.SEVERE_OBESITY
    }

    private getPercentileFromAge(age: string) {
        return BmiPerAge.bmi_boys.filter(value => value.age === age)[0].percentile
    }

    public async generateEvaluation(item: EvaluationRequest): Promise<NutritionEvaluation> {
        try {
            const evaluation: NutritionEvaluation = new NutritionEvaluation()

            /* Get evaluation request values to do the evaluation*/
            const height: Height = item.measurements!.filter(value => value.type === MeasurementTypes.HEIGHT)[0]
            const weight: Weight = item.measurements!.filter(value => value.type === MeasurementTypes.WEIGHT)[0]
            const waist: WaistCircumference =
                item.measurements!.filter(value => value.type === MeasurementTypes.WAIST_CIRCUMFERENCE)[0]
            const birth_date: string = item.patient && item.patient.birth_date ? item.patient.birth_date : ''

            const patientPercentile = this.getPercentileFromAge(this.getAgeFromBirthDate(birth_date))
            const patientBmi = this.calculateBmi(weight.value!, height.value!)
            const patientWaistHeightRelation = this.getWaistHeightRelation(waist.value!, height.value!)

            /* Setting Evaluation values before save.*/
            evaluation.status = NutritionEvaluationStatusTypes.INCOMPLETE
            evaluation.patient_id = item.patient && item.patient.id ? item.patient.id : undefined
            evaluation.pilotstudy_id = item.pilotstudy_id ? item.pilotstudy_id : undefined
            evaluation.health_professional_id = item.health_professional_id ? item.health_professional_id : undefined
            evaluation.patient_id = item.patient!.id
            evaluation.nutritional_status = new NutritionalStatus().fromJSON({
                bmi: patientBmi,
                percentile: patientPercentile,
                classification: this.getBmiPerAgeClassification(patientBmi, patientPercentile)
            })
            evaluation.overweight_indicator = new OverweightIndicator().fromJSON({
                waist_height_relation: patientWaistHeightRelation,
                classification: this.getOverweightIndicator(patientWaistHeightRelation)
            })
            console.log(evaluation.toJSON())
            return Promise.resolve(evaluation)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
