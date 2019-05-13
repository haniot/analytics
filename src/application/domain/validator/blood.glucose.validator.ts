import { ValidationException } from '../exception/validation.exception'
import { MealTypesValidator } from './meal.types.validator'
import { BloodGlucoseClassificationTypesValidator } from './blood.glucose.classification.types.validator'

export class BloodGlucoseValidator {
    public static validate(item: any): void | ValidationException {
        const fields: Array<string> = []

        if (!item.value) fields.push('blood_glucose.value')
        if (!item.meal) fields.push('blood_glucose.meal')
        else MealTypesValidator.validate(item.meal)
        if (!item.classification) fields.push('blood_glucose.classification')
        else BloodGlucoseClassificationTypesValidator.validate(item.classification)
        if (!item.zones) fields.push('blood_glucose.zones')
        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Blood Glucose validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
