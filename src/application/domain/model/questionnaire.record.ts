import { JsonUtils } from '../utils/json.utils'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'

export class QuestionnaireRecord implements IJSONSerializable, IJSONDeserializable<QuestionnaireRecord> {
    private _type?: string

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
        if (json.type !== undefined) this.type = json.type
        return this
    }

    public toJSON(): any {
        return {
        }
    }
}
