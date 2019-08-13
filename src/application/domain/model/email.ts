import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { Attachment } from './attachment'

export class Email implements IJSONSerializable, IJSONDeserializable<Email> {
    private _to?: any
    private _attachments?: Array<Attachment>
    private _pilot_study?: string
    private _request_date?: string
    private _action_url?: string
    private _lang?: string

    get to(): any | undefined {
        return this._to
    }

    set to(value: any | undefined) {
        this._to = value
    }

    get attachments(): Array<Attachment> | undefined {
        return this._attachments
    }

    set attachments(value: Array<Attachment> | undefined) {
        this._attachments = value
    }

    get pilot_study(): string | undefined {
        return this._pilot_study
    }

    set pilot_study(value: string | undefined) {
        this._pilot_study = value
    }

    get request_date(): string | undefined {
        return this._request_date
    }

    set request_date(value: string | undefined) {
        this._request_date = value
    }

    get action_url(): string | undefined {
        return this._action_url
    }

    set action_url(value: string | undefined) {
        this._action_url = value
    }

    get lang(): string | undefined {
        return this._lang
    }

    set lang(value: string | undefined) {
        this._lang = value
    }

    public fromJSON(json: any): Email {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }
        if (json.to !== undefined) this.to = json.to
        if (json.attachments !== undefined) {
            this.attachments = json.attachments.map(item => new Attachment().fromJSON(item))
        }
        if (json.pilot_study !== undefined) this.pilot_study = json.pilot_study
        if (json.request_date !== undefined) this.request_date = json.request_date
        if (json.action_url !== undefined) this.action_url = json.action_url
        if (json.lang !== undefined) this.lang = json.lang

        return this
    }

    public toJSON(): any {
        return {
            to: this.to,
            attachments: this.attachments && this.attachments.length ? this.attachments.map(item => item.toJSON()) : [],
            pilot_study: this.pilot_study,
            request_date: this.request_date,
            action_url: this.action_url,
            lang: this.lang
        }
    }
}
