import { JsonUtils } from '../../utils/json.utils'
import { QuestionnaireTypes } from '../../utils/questionnaire.types'
import { IJSONSerializable } from '../../utils/json.serializable.interface'
import { IJSONDeserializable } from '../../utils/json.deserializable.interface'
import { WeeklyFoodRecord } from './weekly.food.record'
import { QuestionnaireRecord } from './questionnaire.record'

export class FeedingHabitsRecord
    extends QuestionnaireRecord implements IJSONSerializable, IJSONDeserializable<FeedingHabitsRecord> {

    private _weekly_feeding_habits?: Array<WeeklyFoodRecord>
    private _daily_water_glasses?: string
    private _six_month_breast_feeding?: string
    private _food_allergy_intolerance?: Array<string>
    private _breakfast_daily_frequency?: string

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

    get daily_water_glasses(): string | undefined {
        return this._daily_water_glasses
    }

    set daily_water_glasses(value: string | undefined) {
        this._daily_water_glasses = value
    }

    get six_month_breast_feeding(): string | undefined {
        return this._six_month_breast_feeding
    }

    set six_month_breast_feeding(value: string | undefined) {
        this._six_month_breast_feeding = value
    }

    get food_allergy_intolerance(): Array<string> | undefined {
        return this._food_allergy_intolerance
    }

    set food_allergy_intolerance(value: Array<string> | undefined) {
        this._food_allergy_intolerance = value
    }

    get breakfast_daily_frequency(): string | undefined {
        return this._breakfast_daily_frequency
    }

    set breakfast_daily_frequency(value: string | undefined) {
        this._breakfast_daily_frequency = value
    }

    public fromJSON(json: any): FeedingHabitsRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        super.fromJSON(json)

        if (json.weekly_feeding_habits !== undefined && json.weekly_feeding_habits instanceof Array)
            this.weekly_feeding_habits =
                json.weekly_feeding_habits.map(item => new WeeklyFoodRecord().fromJSON(item))
        if (json.daily_water_glasses !== undefined) this.daily_water_glasses = json.daily_water_glasses
        if (json.six_month_breast_feeding !== undefined) this.six_month_breast_feeding = json.six_month_breast_feeding
        if (json.food_allergy_intolerance !== undefined && json.food_allergy_intolerance instanceof Array)
            this.food_allergy_intolerance =
                json.food_allergy_intolerance.filter(item => typeof item === 'string')
        if (json.breakfast_daily_frequency !== undefined) this.breakfast_daily_frequency = json.breakfast_daily_frequency

        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{
                weekly_feeding_habits: this.weekly_feeding_habits,
                daily_water_glasses: this.daily_water_glasses,
                six_month_breast_feeding: this.six_month_breast_feeding,
                food_allergy_intolerance: this.food_allergy_intolerance,
                breakfast_daily_frequency: this.breakfast_daily_frequency
            }
        }
    }
}
