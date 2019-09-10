import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { Entity } from './entity'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { GenderTypes } from '../utils/gender.types'

export class Patient extends Entity implements IJSONSerializable, IJSONDeserializable<Patient> {
    private _name?: string
    private _gender?: GenderTypes
    private _birth_date?: string

    constructor() {
        super()
    }

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }

    get gender(): GenderTypes | undefined {
        return this._gender
    }

    set gender(value: GenderTypes | undefined) {
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
        if (json.name !== undefined) this.name = json.name
        if (json.gender !== undefined) this.gender = json.gender
        if (json.birth_date !== undefined) this.birth_date = json.birth_date

        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            name: this.name,
            gender: this.gender,
            birth_date: this.birth_date
        }
    }
}
