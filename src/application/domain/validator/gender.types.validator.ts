import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { GenderTypes } from '../utils/gender.types'

export class GenderTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(GenderTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`gender: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(GenderTypes).join(', ').concat('.')))
        }
    }
}
