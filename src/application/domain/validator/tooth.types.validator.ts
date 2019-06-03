import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { ToothTypes } from '../utils/tooth.types'

export class ToothTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(ToothTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`tooth_type: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ToothTypes).join(', ').concat('.')))
        }
    }
}
