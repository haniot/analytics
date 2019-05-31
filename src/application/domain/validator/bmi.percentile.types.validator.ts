import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { BmiPercentileTypes } from '../utils/bmi.percentile.types'

export class BmiPercentileTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(BmiPercentileTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`nutritional_status.percentile: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BmiPercentileTypes).join(', ').concat('.')))
        }
    }
}
