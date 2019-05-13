import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { Entity } from './entity'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class Patient extends Entity implements IJSONSerializable, IJSONDeserializable<Patient> {
    private _pilotstudy_id?: string
    private _name?: string
    private _email?: string
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

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }

    get email(): string | undefined {
        return this._email
    }

    set email(value: string | undefined) {
        this._email = value
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
        if (json.name !== undefined) this.name = json.name
        if (json.email !== undefined) this.email = json.email
        if (json.gender !== undefined) this.gender = json.gender
        if (json.birth_date !== undefined) this.birth_date = json.birth_date

        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            pilotstudy_id: this.pilotstudy_id,
            name: this.name,
            email: this.email,
            gender: this.gender,
            birth_date: this.birth_date
        }
    }
}
