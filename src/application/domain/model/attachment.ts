import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class Attachment implements IJSONSerializable, IJSONDeserializable<Attachment> {
    private _filename?: string
    private _path?: string
    private _content_type?: string

    get filename(): string | undefined {
        return this._filename
    }

    set filename(value: string | undefined) {
        this._filename = value
    }

    get path(): string | undefined {
        return this._path
    }

    set path(value: string | undefined) {
        this._path = value
    }

    get content_type(): string | undefined {
        return this._content_type
    }

    set content_type(value: string | undefined) {
        this._content_type = value
    }

    public fromJSON(json: any): Attachment {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.filename !== undefined) this.filename = json.filename
        if (json.path !== undefined) this.path = json.path
        if (json.content_type !== undefined) this.content_type = json.content_type

        return this
    }

    public toJSON(): any {
        return {
            filename: this.filename,
            path: this.path,
            content_type: this.content_type
        }
    }
}
