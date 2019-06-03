import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { BloodGlucoseClassificationTypes } from '../utils/blood.glucose.classification.types'

export class BloodGlucoseClassificationTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(BloodGlucoseClassificationTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`blood_glucose.classification: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BloodGlucoseClassificationTypes).join(', ').concat('.')))
        }
    }
}
