import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { DailyFeedingFrequencyTypes } from '../utils/daily.feeding.frequency.types'

export class DailyFeedingFrequencyTypesValidator {
    public static validate(value: DailyFeedingFrequencyTypes): void | ValidationException {
        if (!Object.values(DailyFeedingFrequencyTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`breakfast_daily_frequency: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(DailyFeedingFrequencyTypes).join(', ').concat('.')))
        }
    }
}
