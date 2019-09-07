import { JsonUtils } from '../utils/json.utils'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { FoodTypes } from '../utils/food.types'
import { SevenDaysFeedingFrequencyTypes } from '../utils/seven.days.feeding.frequency.types'

export class WeeklyFoodRecord implements IJSONSerializable, IJSONDeserializable<WeeklyFoodRecord> {
    private _food?: FoodTypes
    private _seven_days_freq?: SevenDaysFeedingFrequencyTypes

    get food(): FoodTypes | undefined {
        return this._food
    }

    set food(value: FoodTypes | undefined) {
        this._food = value
    }

    get seven_days_freq(): SevenDaysFeedingFrequencyTypes | undefined {
        return this._seven_days_freq
    }

    set seven_days_freq(value: SevenDaysFeedingFrequencyTypes | undefined) {
        this._seven_days_freq = value
    }

    public fromJSON(json: any): WeeklyFoodRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.food !== undefined) this.food = json.food
        if (json.seven_days_freq !== undefined) this.seven_days_freq = json.seven_days_freq

        return this
    }

    public toJSON(): any {
        return {
            food: this.food,
            seven_days_freq: this.seven_days_freq
        }
    }
}
