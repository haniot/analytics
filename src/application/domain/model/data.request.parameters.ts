import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class DataRequestParameters implements IJSONSerializable, IJSONDeserializable<DataRequestParameters> {
    private _patients?: Array<string>
    private _data_types?: Array<string>

    get patients(): Array<string> | undefined {
        return this._patients
    }

    set patients(value: Array<string> | undefined) {
        this._patients = value
    }

    get data_types(): Array<string> | undefined {
        return this._data_types
    }

    set data_types(value: Array<string> | undefined) {
        this._data_types = value
    }

    public fromJSON(json: any): DataRequestParameters {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.patients !== undefined && json.patients instanceof Array) this.patients = json.patients
        if (json.data_types !== undefined && json.data_types instanceof Array) this.data_types = json.data_types
        return this
    }

    public toJSON(): any {
        return {
            patients: this.patients ? this.patients : undefined,
            data_types: this.data_types ? this.data_types : undefined
        }
    }
}
