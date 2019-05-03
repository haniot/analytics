import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class NutritionalStatus implements IJSONSerializable, IJSONDeserializable<NutritionalStatus> {
    private _bmi?: number
    private _percentile?: string
    private _classification?: string

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

        if (json.bmi !== undefined) this.bmi = json.bmi
        if (json.percentile !== undefined) this.percentile = json.percentile
        if (json.classification !== undefined) this.classification = json.classification
        return this
    }

    public toJSON(): any {
        return {
            bmi: this.bmi,
            percentile: this.percentile,
            classification: this.classification
        }
    }

}
