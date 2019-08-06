import { FeedingHabitsRecord } from '../model/feeding.habits.record'
import { ValidationException } from '../exception/validation.exception'
import { WeeklyFoodRecordValidator } from './weekly.food.record.validator'
import { BreastFeedingTypesValidator } from './breast.feeding.types.validator'
import { FoodAllergyIntoleranceTypesValidator } from './food.allergy.intolerance.types.validator'
import { DailyFeedingFrequencyTypesValidator } from './daily.feeding.frequency.types.validator'
import { OneDayFeedingAmountTypesValidator } from './one.day.feeding.amount.types.validator'
import { WeeklyFoodRecord } from '../model/weekly.food.record'

export class FeedingHabitsRecordValidator {
    public static validate(item: FeedingHabitsRecord): void | ValidationException {
        let fields: Array<string> = []

        if (!item.weekly_feeding_habits) fields.push('weekly_feeding_habits')
        else item.weekly_feeding_habits.forEach((value: WeeklyFoodRecord) => WeeklyFoodRecordValidator.validate(value))
        if (!item.daily_water_glasses) fields.push('daily_water_glasses')
        else OneDayFeedingAmountTypesValidator.validate(item.daily_water_glasses)
        if (!item.six_month_breast_feeding) fields.push('six_month_breast_feeding')
        else BreastFeedingTypesValidator.validate(item.six_month_breast_feeding)
        if (!item.food_allergy_intolerance) fields.push('food_allergy_intolerance')
        else item.food_allergy_intolerance.forEach(value => {
            FoodAllergyIntoleranceTypesValidator.validate(value)
        })
        if (!item.breakfast_daily_frequency) fields.push('breakfast_daily_frequency')
        else DailyFeedingFrequencyTypesValidator.validate(item.breakfast_daily_frequency)

        fields = [...new Set(fields)]
        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Feeding Habits Record validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
