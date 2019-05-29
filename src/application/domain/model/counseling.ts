import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { NutritionCouncil } from './nutrition.council'

export class Counseling implements IJSONSerializable, IJSONDeserializable<Counseling> {
    private _suggested?: NutritionCouncil
    private _definitive?: NutritionCouncil

    get suggested(): NutritionCouncil | undefined {
        return this._suggested
    }

    set suggested(value: NutritionCouncil | undefined) {
        this._suggested = value
    }

    get definitive(): NutritionCouncil | undefined {
        return this._definitive
    }

    set definitive(value: NutritionCouncil | undefined) {
        this._definitive = value
    }

    public fromJSON(json: any): Counseling {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.suggested !== undefined) this.suggested = new NutritionCouncil().fromJSON(json.suggested)
        if (json.definitive !== undefined) this.definitive = new NutritionCouncil().fromJSON(json.definitive)
        return this
    }

    public toJSON(): any {
        return {
            suggested: this.suggested ? this.suggested.toJSON() : [],
            definitive: this.definitive ? this.definitive.toJSON() : []
        }
    }
}
