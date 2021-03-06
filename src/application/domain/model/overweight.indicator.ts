import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class OverweightIndicator implements IJSONSerializable, IJSONDeserializable<OverweightIndicator> {
    private _waist_circumference?: number
    private _height?: number
    private _waist_height_relation?: number
    private _classification?: string

    get waist_circumference(): number | undefined {
        return this._waist_circumference
    }

    set waist_circumference(value: number | undefined) {
        this._waist_circumference = value
    }

    get height(): number | undefined {
        return this._height
    }

    set height(value: number | undefined) {
        this._height = value
    }

    get waist_height_relation(): number | undefined {
        return this._waist_height_relation
    }

    set waist_height_relation(value: number | undefined) {
        this._waist_height_relation = value
    }

    get classification(): string | undefined {
        return this._classification
    }

    set classification(value: string | undefined) {
        this._classification = value
    }

    public fromJSON(json: any): OverweightIndicator {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.waist_circumference !== undefined) this.waist_circumference = json.waist_circumference
        if (json.height !== undefined) this.height = json.height
        if (json.waist_height_relation !== undefined) this.waist_height_relation = json.waist_height_relation
        if (json.classification !== undefined) this.classification = json.classification
        return this
    }

    public toJSON(): any {
        return {
            waist_circumference: this.waist_circumference,
            height: this.height,
            waist_height_relation: this.waist_height_relation,
            classification: this.classification
        }
    }
}
