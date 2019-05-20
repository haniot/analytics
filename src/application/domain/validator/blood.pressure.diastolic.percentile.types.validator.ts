import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'

export class BloodPressureDiastolicPercentileTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(BloodPressureDiastolicPercentileTypesValidator).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`diastolic_percentile: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BloodPressureDiastolicPercentileTypesValidator).join(', ').concat('.')))
        }
    }
}
