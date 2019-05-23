import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { ScholarityLevelTypes } from '../utils/scholarity.level.types'

export class ScholarityLevelTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(ScholarityLevelTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`mother_scholarity: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ScholarityLevelTypes).join(', ').concat('.')))
        }
    }
}
