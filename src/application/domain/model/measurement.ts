import { JsonUtils } from '../utils/json.utils'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'

export class Measurement implements IJSONSerializable, IJSONDeserializable<Measurement> {
    private _unit?: string
    private _type?: string
    private _device_id?: string
    private _user_id?: string

    get unit(): string | undefined {
        return this._unit
    }

    set unit(value: string | undefined) {
        this._unit = value
    }

    get type(): string | undefined {
        return this._type
    }

    set type(value: string | undefined) {
        this._type = value
    }

    get device_id(): string | undefined {
        return this._device_id
    }

    set device_id(value: string | undefined) {
        this._device_id = value
    }

    get user_id(): string | undefined {
        return this._user_id
    }

    set user_id(value: string | undefined) {
        this._user_id = value
    }

    public fromJSON(json: any): Measurement {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.unit !== undefined) this.unit = json.unit
        if (json.device_id !== undefined) this.device_id = json.device_id
        if (json.user_id !== undefined) this.user_id = json.user_id

        return this
    }

    public toJSON(): any {
        return {
            unit: this.unit,
            type: this.type,
            device_id: this.device_id
        }
    }
}
