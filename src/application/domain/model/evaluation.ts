import { Entity } from './entity'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { DatetimeValidator } from '../validator/date.time.validator'
import { EvaluationStatusTypes } from '../utils/evaluation.status.types'

export class Evaluation extends Entity implements IJSONSerializable, IJSONDeserializable<Evaluation> {
    private _type?: string
    private _status?: EvaluationStatusTypes
    private _created_at?: Date
    private _pilotstudy_id?: string
    private _health_professional_id?: string

    public constructor() {
        super()
    }

    get type(): string | undefined {
        return this._type
    }

    set type(value: string | undefined) {
        this._type = value
    }

    get status(): EvaluationStatusTypes | undefined {
        return this._status
    }

    set status(value: EvaluationStatusTypes | undefined) {
        this._status = value
    }

    get created_at(): Date | undefined {
        return this._created_at
    }

    set created_at(value: Date | undefined) {
        this._created_at = value
    }

    get pilotstudy_id(): string | undefined {
        return this._pilotstudy_id
    }

    set pilotstudy_id(value: string | undefined) {
        this._pilotstudy_id = value
    }

    get health_professional_id(): string | undefined {
        return this._health_professional_id
    }

    set health_professional_id(value: string | undefined) {
        this._health_professional_id = value
    }

    public convertDatetimeString(value: string): Date {
        DatetimeValidator.validate(value)
        return new Date(value)
    }

    public fromJSON(json: any): Evaluation {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.type !== undefined) this.type = json.type
        if (json.status !== undefined) this.status = json.status
        if (json.created_at !== undefined) this.created_at = this.convertDatetimeString(json.created_at)
        if (json.pilotstudy_id !== undefined) this.pilotstudy_id = json.pilotstudy_id
        if (json.health_professional_id !== undefined) this.health_professional_id = json.health_professional_id
        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            status: this.status,
            created_at: this.created_at,
            pilotstudy_id: this.pilotstudy_id,
            health_professional_id: this.health_professional_id
        }
    }
}
