import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { BloodPressurePerAgeClassificationTypes } from '../utils/blood.pressure.per.age.classification.types'

export class BloodPressurePerAgeClassificationTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(BloodPressurePerAgeClassificationTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`classification: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BloodPressurePerAgeClassificationTypes).join(', ').concat('.')))
        }
    }
}
