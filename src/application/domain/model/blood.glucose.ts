import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class BloodGlucose implements IJSONSerializable, IJSONDeserializable<BloodGlucose> {
    private _value?: number
    private _meal?: string
    private _classification?: string

    get value(): number | undefined {
        return this._value
    }

    set value(value: number | undefined) {
        this._value = value
    }

    get meal(): string | undefined {
        return this._meal
    }

    set meal(value: string | undefined) {
        this._meal = value
    }

    get classification(): string | undefined {
        return this._classification
    }

    set classification(value: string | undefined) {
        this._classification = value
    }

    public fromJSON(json: any): BloodGlucose {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.value !== undefined) this.value = json.value
        if (json.meal !== undefined) this.meal = json.meal
        if (json.classification !== undefined) this.classification = json.classification

        return this
    }

    public toJSON(): any {
        return {
            value: this.value,
            meal: this.meal,
            classification: this.classification
        }
    }

}
