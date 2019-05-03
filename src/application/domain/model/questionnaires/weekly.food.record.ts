import { JsonUtils } from '../../utils/json.utils'
import { IJSONSerializable } from '../../utils/json.serializable.interface'
import { IJSONDeserializable } from '../../utils/json.deserializable.interface'

export class WeeklyFoodRecord implements IJSONSerializable, IJSONDeserializable<WeeklyFoodRecord> {
    private _food?: string
    private _seven_days_freq?: string

    get food(): string | undefined {
        return this._food
    }

    set food(value: string | undefined) {
        this._food = value
    }

    get seven_days_freq(): string | undefined {
        return this._seven_days_freq
    }

    set seven_days_freq(value: string | undefined) {
        this._seven_days_freq = value
    }

    public fromJSON(json: any): WeeklyFoodRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.food !== undefined) this.food = json.food
        if (json.seven_days_freq !== undefined) this.seven_days_freq = json.seven_days_freq

        return this.toJSON()
    }

    public toJSON(): any {
        return {
            food: this.food,
            seven_days_freq: this.seven_days_freq
        }
    }
}
