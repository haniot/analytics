import { JsonUtils } from '../utils/json.utils'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'

export class ChronicDisease implements IJSONSerializable, IJSONDeserializable<ChronicDisease> {
    private _type?: string
    private _disease_history?: string

    get type(): string | undefined {
        return this._type
    }

    set type(value: string | undefined) {
        this._type = value
    }

    get disease_history(): string | undefined {
        return this._disease_history
    }

    set disease_history(value: string | undefined) {
        this._disease_history = value
    }

    public fromJSON(json: any): ChronicDisease {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.type !== undefined) this.type = json.type
        if (json.disease_history !== undefined) this.disease_history = json.disease_history

        return this.toJSON()
    }

    public toJSON(): any {
        return {
            type: this.type,
            disease_history: this.disease_history
        }
    }
}
