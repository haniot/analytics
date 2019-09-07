import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { BloodPressurePercentileClassificationTypes } from '../utils/blood.pressure.percentile.classification.types'

export class BloodPressurePercentileClassificationTypesValidator {
    public static validate(value: BloodPressurePercentileClassificationTypes): void | ValidationException {
        if (!Object.values(BloodPressurePercentileClassificationTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`classification: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BloodPressurePercentileClassificationTypes).join(', ').concat('.')))
        }
    }
}
