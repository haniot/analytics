import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class NutritionalStatus implements IJSONSerializable, IJSONDeserializable<NutritionalStatus> {
    private _height?: number
    private _weight?: number
    private _bmi?: number
    private _percentile?: string
    private _classification?: string

    get height(): number | undefined {
        return this._height
    }

    set height(value: number | undefined) {
        this._height = value
    }

    get weight(): number | undefined {
        return this._weight
    }

    set weight(value: number | undefined) {
        this._weight = value
    }

    get bmi(): number | undefined {
        return this._bmi
    }

    set bmi(value: number | undefined) {
        this._bmi = value
    }

    get percentile(): string | undefined {
        return this._percentile
    }

    set percentile(value: string | undefined) {
        this._percentile = value
    }

    get classification(): string | undefined {
        return this._classification
    }

    set classification(value: string | undefined) {
        this._classification = value
    }

    public fromJSON(json: any): NutritionalStatus {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.height !== undefined) this.height = json.height
        if (json.weight !== undefined) this.weight = json.weight
        if (json.bmi !== undefined) this.bmi = json.bmi
        if (json.percentile !== undefined) this.percentile = json.percentile
        if (json.classification !== undefined) this.classification = json.classification
        return this
    }

    public toJSON(): any {
        return {
            height: this.height,
            weight: this.weight,
            bmi: this.bmi,
            percentile: this.percentile,
            classification: this.classification
        }
    }

}
