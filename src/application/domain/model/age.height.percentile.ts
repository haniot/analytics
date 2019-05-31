import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class AgeHeightPercentile implements IJSONSerializable, IJSONDeserializable<AgeHeightPercentile> {
    private _age?: number
    private _height?: number
    private _percentile?: number

    get age(): number | undefined {
        return this._age
    }

    set age(value: number | undefined) {
        this._age = value
    }

    get height(): number | undefined {
        return this._height
    }

    set height(value: number | undefined) {
        this._height = value
    }

    get percentile(): number | undefined {
        return this._percentile
    }

    set percentile(value: number | undefined) {
        this._percentile = value
    }

    public fromJSON(json: any): AgeHeightPercentile {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.age !== undefined) this.age = json.age
        if (json.height !== undefined) this.height = json.height
        if (json.percentile !== undefined) this.percentile = json.percentile

        return this
    }

    public toJSON(): any {
        return {
            age: this.age,
            height: this.height,
            percentile: this.percentile
        }
    }
}
