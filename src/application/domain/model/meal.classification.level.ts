import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class MealClassificationLevel implements IJSONSerializable, IJSONDeserializable<MealClassificationLevel> {
    private _min?: number
    private _max?: number

    get min(): number | undefined {
        return this._min
    }

    set min(value: number | undefined) {
        this._min = value
    }

    get max(): number | undefined {
        return this._max
    }

    set max(value: number | undefined) {
        this._max = value
    }

    public fromJSON(json: any): MealClassificationLevel {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.min !== undefined) this.min = json.min
        if (json.max !== undefined) this.max = json.max
        return this
    }

    public toJSON(): any {
        return {
            min: this.min,
            max: this.max
        }
    }

}
