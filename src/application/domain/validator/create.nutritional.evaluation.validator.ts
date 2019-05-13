import { NutritionEvaluation } from '../model/nutrition.evaluation'
import { ValidationException } from '../exception/validation.exception'
import { EvaluationStatusTypesValidator } from './evaluation.status.types.validator'
import { ObjectIdValidator } from './object.id.validator'
import { NutritionalStatusValidator } from './nutritional.status.validator'
import { OverweightIndicatorValidator } from './overweight.indicator.validator'
import { HeartRateValidator } from './heart.rate.validator'
import { BloodGlucoseValidator } from './blood.glucose.validator'

export class CreateNutritionalEvaluationValidator {
    public static validate(item: NutritionEvaluation): void | ValidationException {
        const fields: Array<string> = []

        if (!item.status) fields.push('status')
        else EvaluationStatusTypesValidator.validate(item.status)
        if (!item.patient_id) fields.push('patient_id')
        else ObjectIdValidator.validate(item.patient_id)
        if (!item.nutritional_status) fields.push('nutritional_status')
        else NutritionalStatusValidator.validate(item.nutritional_status)
        if (!item.overweight_indicator) fields.push('overweight_indicator')
        else OverweightIndicatorValidator.validate(item.overweight_indicator)
        if (!item.heart_rate) fields.push('heart_rate')
        else HeartRateValidator.validate(item.heart_rate)
        if (!item.blood_glucose) fields.push('blood_glucose')
        else BloodGlucoseValidator.validate(item.blood_glucose)

        // TODO Validate Blood Pressure

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Nutritional Evaluation validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
