import { Entity } from './entity'
import { JsonUtils } from '../utils/json.utils'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'

export class QuestionnaireRecord extends Entity implements IJSONSerializable, IJSONDeserializable<QuestionnaireRecord> {
    private _patient_id?: string
    private _created_at?: string
    private _type?: string

    constructor() {
        super()
    }

    get patient_id(): string | undefined {
        return this._patient_id
    }

    set patient_id(value: string | undefined) {
        this._patient_id = value
    }

    get created_at(): string | undefined {
        return this._created_at
    }

    set created_at(value: string | undefined) {
        this._created_at = value
    }

    get type(): string | undefined {
        return this._type
    }

    set type(value: string | undefined) {
        this._type = value
    }

    public fromJSON(json: any): QuestionnaireRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.id !== undefined) super.id = this.id
        if (json.patient_id !== undefined) this.patient_id = json.patient_id
        if (json.created_at !== undefined) this.created_at = json.created_at
        if (json.type !== undefined) this.type = json.type

        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            created_at: this.created_at ? new Date(this.created_at).toISOString() : undefined,
            type: this._type
        }
    }
}
