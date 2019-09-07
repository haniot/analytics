import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { BmiPerAgeClassificationTypes } from '../utils/bmi.per.age.classification.types'

export class BmiPerAgeClassificationTypesValidator {
    public static validate(value: BmiPerAgeClassificationTypes): void | ValidationException {
        if (!Object.values(BmiPerAgeClassificationTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`nutritional_status.classification: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BmiPerAgeClassificationTypes).join(', ').concat('.')))
        }
    }
}
