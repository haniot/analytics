import { JsonUtils } from '../utils/json.utils'
import { QuestionnaireTypes } from '../utils/questionnaire.types'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { WeeklyFoodRecord } from './weekly.food.record'
import { QuestionnaireRecord } from './questionnaire.record'
import { OneDayFeedingAmountTypes } from '../utils/one.day.feeding.amount.types'
import { BreakfastFeedingTypes } from '../utils/breakfastFeedingTypes'
import { FoodAllergyIntoleranceTypes } from '../utils/food.allergy.intolerance.types'
import { DailyFeedingFrequencyTypes } from '../utils/daily.feeding.frequency.types'

export class FeedingHabitsRecord
    extends QuestionnaireRecord implements IJSONSerializable, IJSONDeserializable<FeedingHabitsRecord> {

    private _weekly_feeding_habits?: Array<WeeklyFoodRecord>
    private _daily_water_glasses?: OneDayFeedingAmountTypes
    private _six_month_breast_feeding?: BreakfastFeedingTypes
    private _food_allergy_intolerance?: Array<FoodAllergyIntoleranceTypes>
    private _breakfast_daily_frequency?: DailyFeedingFrequencyTypes

    constructor() {
        super()
        super.type = QuestionnaireTypes.FEEDING_HABITS_RECORD
    }

    get weekly_feeding_habits(): Array<WeeklyFoodRecord> | undefined {
        return this._weekly_feeding_habits
    }

    set weekly_feeding_habits(value: Array<WeeklyFoodRecord> | undefined) {
        this._weekly_feeding_habits = value
    }

    get daily_water_glasses(): OneDayFeedingAmountTypes | undefined {
        return this._daily_water_glasses
    }

    set daily_water_glasses(value: OneDayFeedingAmountTypes | undefined) {
        this._daily_water_glasses = value
    }

    get six_month_breast_feeding(): BreakfastFeedingTypes | undefined {
        return this._six_month_breast_feeding
    }

    set six_month_breast_feeding(value: BreakfastFeedingTypes | undefined) {
        this._six_month_breast_feeding = value
    }

    get food_allergy_intolerance(): Array<FoodAllergyIntoleranceTypes> | undefined {
        return this._food_allergy_intolerance
    }

    set food_allergy_intolerance(value: Array<FoodAllergyIntoleranceTypes> | undefined) {
        this._food_allergy_intolerance = value
    }

    get breakfast_daily_frequency(): DailyFeedingFrequencyTypes | undefined {
        return this._breakfast_daily_frequency
    }

    set breakfast_daily_frequency(value: DailyFeedingFrequencyTypes | undefined) {
        this._breakfast_daily_frequency = value
    }

    public fromJSON(json: any): FeedingHabitsRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }
        super.fromJSON(json)
        if (json.weekly_feeding_habits !== undefined && json.weekly_feeding_habits.length)
            this.weekly_feeding_habits =
                json.weekly_feeding_habits.map(item => new WeeklyFoodRecord().fromJSON(item))
        if (json.daily_water_glasses !== undefined) this.daily_water_glasses = json.daily_water_glasses
        if (json.six_month_breast_feeding !== undefined) this.six_month_breast_feeding = json.six_month_breast_feeding
        if (json.food_allergy_intolerance !== undefined && json.food_allergy_intolerance.length)
            this.food_allergy_intolerance =
                json.food_allergy_intolerance.filter(item => typeof item === 'string')
        if (json.breakfast_daily_frequency !== undefined) this.breakfast_daily_frequency = json.breakfast_daily_frequency

        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{
                weekly_feeding_habits: this.weekly_feeding_habits && this.weekly_feeding_habits ?
                    this.weekly_feeding_habits.map(item => item.toJSON()) : undefined,
                daily_water_glasses: this.daily_water_glasses,
                six_month_breast_feeding: this.six_month_breast_feeding,
                food_allergy_intolerance: this.food_allergy_intolerance,
                breakfast_daily_frequency: this.breakfast_daily_frequency
            }
        }
    }
}
