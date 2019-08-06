import { ValidationException } from '../exception/validation.exception'
import { MealTypesValidator } from './meal.types.validator'
import { BloodGlucoseClassificationTypesValidator } from './blood.glucose.classification.types.validator'
import { BloodGlucose } from '../model/blood.glucose'

export class BloodGlucoseValidator {
    public static validate(item: BloodGlucose): void | ValidationException {
        const fields: Array<string> = []

        if (!item.value) fields.push('blood_glucose.value')
        if (!item.meal) fields.push('blood_glucose.meal')
        else MealTypesValidator.validate(item.meal)
        if (!item.classification) fields.push('blood_glucose.classification')
        else BloodGlucoseClassificationTypesValidator.validate(item.classification)
        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Blood Glucose validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
