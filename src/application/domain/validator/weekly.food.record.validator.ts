import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { SevenDaysFeedingFrequencyTypes } from '../utils/seven.days.feeding.frequency.types'
import { WeeklyFoodRecord } from '../model/weekly.food.record'
import { FoodTypes } from '../utils/food.types'

export class WeeklyFoodRecordValidator {
    public static validate(value: WeeklyFoodRecord): void | ValidationException {
        const fields: Array<string> = []

        if (!value.food) fields.push('food')
        else {
            if (!Object.values(FoodTypes).includes(value.food)) {
                throw new ValidationException(
                    Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`weekly_food_record.food: ${value}`),
                    Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                        .concat(Object.values(FoodTypes).join(', ').concat('.')))
            }
        }
        if (!value.seven_days_freq) fields.push('seven_days_freq')
        else {
            if (!Object.values(SevenDaysFeedingFrequencyTypes).includes(value.seven_days_freq)) {
                throw new ValidationException(
                    Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`weekly_food_record.seven_days_freq: ${value}`),
                    Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                        .concat(Object.values(SevenDaysFeedingFrequencyTypes).join(', ').concat('.')))
            }
        }

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Weekly Food Record validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
