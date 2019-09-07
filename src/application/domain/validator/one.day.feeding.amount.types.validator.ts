import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { OneDayFeedingAmountTypes } from '../utils/one.day.feeding.amount.types'

export class OneDayFeedingAmountTypesValidator {
    public static validate(value: OneDayFeedingAmountTypes): void | ValidationException {
        if (!Object.values(OneDayFeedingAmountTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`daily_water_glasses: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(OneDayFeedingAmountTypes).join(', ').concat('.')))
        }
    }
}
