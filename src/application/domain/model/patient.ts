import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { Entity } from './entity'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class Patient extends Entity implements IJSONSerializable, IJSONDeserializable<Patient> {
    private _pilotstudy_id?: string
    private _first_name?: string
    private _last_name?: string
    private _gender?: string
    private _birth_date?: string

    constructor() {
        super()
    }

    get pilotstudy_id(): string | undefined {
        return this._pilotstudy_id
    }

    set pilotstudy_id(value: string | undefined) {
        this._pilotstudy_id = value
    }

    get first_name(): string | undefined {
        return this._first_name
    }

    set first_name(value: string | undefined) {
        this._first_name = value
    }

    get last_name(): string | undefined {
        return this._last_name
    }

    set last_name(value: string | undefined) {
        this._last_name = value
    }

    get gender(): string | undefined {
        return this._gender
    }

    set gender(value: string | undefined) {
        this._gender = value
    }

    get birth_date(): string | undefined {
        return this._birth_date
    }

    set birth_date(value: string | undefined) {
        this._birth_date = value
    }

    public fromJSON(json: any): Patient {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.id !== undefined) super.id = json.id
        if (json.pilotstudy_id !== undefined) this.pilotstudy_id = json.pilotstudy_id
        if (json.first_name !== undefined) this.first_name = json.first_name
        if (json.last_name !== undefined) this.last_name = json.last_name
        if (json.gender !== undefined) this.gender = json.gender
        if (json.birth_date !== undefined) this.birth_date = json.birth_date

        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            pilotstudy_id: this.pilotstudy_id,
            first_name: this.first_name,
            last_name: this.last_name,
            gender: this.gender,
            birth_date: this.birth_date
        }
    }
}
