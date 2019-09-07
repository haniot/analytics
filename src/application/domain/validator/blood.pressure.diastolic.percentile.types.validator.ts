import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { BloodPressureDiastolicPercentileTypes } from '../utils/blood.pressure.diastolic.percentile.types'

export class BloodPressureDiastolicPercentileTypesValidator {
    public static validate(value: BloodPressureDiastolicPercentileTypes): void | ValidationException {
        if (!Object.values(BloodPressureDiastolicPercentileTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`diastolic_percentile: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BloodPressureDiastolicPercentileTypes).join(', ').concat('.')))
        }
    }
}
