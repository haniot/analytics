import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class EvaluationFile implements IJSONSerializable, IJSONDeserializable<EvaluationFile> {
    private _name?: string
    private _file?: any

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }

    get file(): any | undefined {
        return this._file
    }

    set file(value: any | undefined) {
        this._file = value
    }

    public fromJSON(json: any): EvaluationFile {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.name !== undefined) this.name = json.name
        if (json.file !== undefined) this.file = json.file

        return this
    }

    public toJSON(): any {
        return {
            name: this.name,
            file: this.file
        }
    }
}
