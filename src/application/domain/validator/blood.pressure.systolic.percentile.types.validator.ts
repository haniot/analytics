import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { BloodPressureSystolicPercentileTypes } from '../utils/blood.pressure.systolic.percentile.types'

export class BloodPressureSystolicPercentileTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(BloodPressureSystolicPercentileTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`systolic_percentile: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BloodPressureSystolicPercentileTypes).join(', ').concat('.')))
        }
    }
}
