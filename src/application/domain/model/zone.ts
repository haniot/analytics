import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { MealClassification } from './meal.classification'
import { JsonUtils } from '../utils/json.utils'

export class Zone implements IJSONSerializable, IJSONDeserializable<Zone> {
    private _prepandial?: MealClassification
    private _postprandial?: MealClassification

    get prepandial(): MealClassification | undefined {
        return this._prepandial
    }

    set prepandial(value: MealClassification | undefined) {
        this._prepandial = value
    }

    get postprandial(): MealClassification | undefined {
        return this._postprandial
    }

    set postprandial(value: MealClassification | undefined) {
        this._postprandial = value
    }

    public fromJSON(json: any): Zone {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.prepandial !== undefined) this.prepandial = new MealClassification().fromJSON(json.prepandial)
        if (json.postprandial !== undefined) this.postprandial = new MealClassification().fromJSON(json.postprandial)
        return this
    }

    public toJSON(): any {
        return {
            prepandial: this.prepandial ? this.prepandial.toJSON() : undefined,
            postprandial: this.postprandial ? this.postprandial.toJSON() : undefined
        }
    }
}
