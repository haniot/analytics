import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { OverweightClassificationTypes } from '../utils/overweight.classification.types'

export class OverweightClassificationTypesValidator{
    public static validate(value: string): void | ValidationException {
        if (!Object.values(OverweightClassificationTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`overweight_indicator.classification: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(OverweightClassificationTypes).join(', ').concat('.')))
        }
    }
}
