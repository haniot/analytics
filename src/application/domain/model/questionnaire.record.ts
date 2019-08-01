import { JsonUtils } from '../utils/json.utils'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { DatetimeValidator } from '../validator/date.time.validator'

export class QuestionnaireRecord implements IJSONSerializable, IJSONDeserializable<QuestionnaireRecord> {
    private _patient_id?: string
    private _type?: string

    get patient_id(): string | undefined {
        return this._patient_id
    }

    set patient_id(value: string | undefined) {
        this._patient_id = value
    }

    get type(): string | undefined {
        return this._type
    }

    set type(value: string | undefined) {
        this._type = value
    }

    public convertDatetimeString(value: string): Date {
        DatetimeValidator.validate(value)
        return new Date(value)
    }

    public fromJSON(json: any): QuestionnaireRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.patient_id !== undefined) this.patient_id = json.patient_id
        if (json.type !== undefined) this.type = json.type

        return this
    }

    public toJSON(): any {
        return {
        }
    }
}
