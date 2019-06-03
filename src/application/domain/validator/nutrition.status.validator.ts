import { ValidationException } from '../exception/validation.exception'
import { BmiPercentileTypesValidator } from './bmi.percentile.types.validator'
import { BmiPerAgeClassificationTypesValidator } from './bmi.per.age.classification.types.validator'

export class NutritionStatusValidator {
    public static validate(item: any): void | ValidationException {
        const fields: Array<string> = []

        if (!item.bmi) fields.push('nutritional_status.bmi')
        if (!item.percentile) fields.push('nutritional_status.percentile')
        else BmiPercentileTypesValidator.validate(item.percentile)
        if (!item.classification) fields.push('nutritional_status.classification')
        else BmiPerAgeClassificationTypesValidator.validate(item.classification)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Nutritional Status validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
