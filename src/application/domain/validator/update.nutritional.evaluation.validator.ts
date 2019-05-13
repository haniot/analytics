import { NutritionEvaluation } from '../model/nutrition.evaluation'
import { ValidationException } from '../exception/validation.exception'
import { EvaluationStatusTypesValidator } from './evaluation.status.types.validator'
import { ObjectIdValidator } from './object.id.validator'
import { NutritionalStatusValidator } from './nutritional.status.validator'
import { OverweightIndicatorValidator } from './overweight.indicator.validator'
import { HeartRateValidator } from './heart.rate.validator'
import { BloodGlucoseValidator } from './blood.glucose.validator'

export class UpdateNutritionalEvaluationValidator {
    public static validate(item: NutritionEvaluation): void | ValidationException {
        if (item.status) EvaluationStatusTypesValidator.validate(item.status)
        if (item.patient_id) ObjectIdValidator.validate(item.patient_id)
        if (item.nutritional_status) NutritionalStatusValidator.validate(item.nutritional_status)
        if (item.overweight_indicator) OverweightIndicatorValidator.validate(item.overweight_indicator)
        if (item.heart_rate) HeartRateValidator.validate(item.heart_rate)
        if (item.blood_glucose) BloodGlucoseValidator.validate(item.blood_glucose)
    }
}
