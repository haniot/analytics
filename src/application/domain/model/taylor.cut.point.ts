import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class TaylorCutPoint implements IJSONSerializable, IJSONDeserializable<TaylorCutPoint> {
    private _waist_circumference?: number
    private _classification?: string

    get waist_circumference(): number | undefined {
        return this._waist_circumference
    }

    set waist_circumference(value: number | undefined) {
        this._waist_circumference = value
    }

    get classification(): string | undefined {
        return this._classification
    }

    set classification(value: string | undefined) {
        this._classification = value
    }

    public fromJSON(json: any): TaylorCutPoint {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.waist_circumference !== undefined) this.waist_circumference = json.waist_circumference
        if (json.classification !== undefined) this.classification = json.classification

        return this
    }

    public toJSON(): any {
        return {
            waist_circumference: this.waist_circumference,
            classification: this.classification
        }
    }

}
