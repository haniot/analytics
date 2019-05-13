import { ValidationException } from '../exception/validation.exception'
import { OverweightClassificationTypesValidator } from './overweight.classification.types.validator'

export class OverweightIndicatorValidator {
    public static validate(item: any): void | ValidationException {
        const fields: Array<string> = []

        if (!item.waist_height_relation) fields.push('overweight_indicator.waist_height_relation')
        if (!item.classification) fields.push('overweight_indicator.classification')
        else OverweightClassificationTypesValidator.validate(item.classification)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Overweight Indicator validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
