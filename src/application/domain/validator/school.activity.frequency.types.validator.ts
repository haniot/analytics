import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { SchoolActivityFrequencyTypes } from '../utils/school.activity.frequency.types'

export class SchoolActivityFrequencyTypesValidator {
    public static validate(value: SchoolActivityFrequencyTypes): void | ValidationException {
        if (!Object.values(SchoolActivityFrequencyTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`school_activity_freq: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(SchoolActivityFrequencyTypes).join(', ').concat('.')))
        }
    }
}
