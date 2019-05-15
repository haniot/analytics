import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class Counseling implements IJSONSerializable, IJSONDeserializable<Counseling> {
    private _type?: string
    private _councils?: Array<string>

    get type(): string | undefined {
        return this._type
    }

    set type(value: string | undefined) {
        this._type = value
    }

    get councils(): Array<string> | undefined {
        return this._councils
    }

    set councils(value: Array<string> | undefined) {
        this._councils = value
    }

    public fromJSON(json: any): Counseling {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.type !== undefined) this.type = json.type
        if (json.councils !== undefined && json.councils.length) this.councils = json.councils
        return this
    }

    public toJSON(): any {
        return {
            type: this.type,
            councils: this.councils && this.councils.length ? this.councils : []
        }
    }
}
