import { ValidationException } from '../exception/validation.exception'
import { BreastFeedingTypes } from '../utils/breast.feeding.types'
import { Strings } from '../../../utils/strings'

export class BreastFeedingTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(BreastFeedingTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`six_month_breast_feeding: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BreastFeedingTypes).join(', ').concat('.')))
        }
    }
}
