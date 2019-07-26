import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class DataRequest implements IJSONSerializable, IJSONDeserializable<DataRequest> {
    private _data_types?: Array<string>
    private _patients?: Array<string>

    get data_types(): Array<string> | undefined {
        return this._data_types
    }

    set data_types(value: Array<string> | undefined) {
        this._data_types = value
    }

    get patients(): Array<string> | undefined {
        return this._patients
    }

    set patients(value: Array<string> | undefined) {
        this._patients = value
    }

    public fromJSON(json: any): DataRequest {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.data_types && json.data_types instanceof Array) this.data_types = json.data_types
        if (json.patients && json.patients instanceof Array) this.patients = json.patients
        return this
    }

    public toJSON(): any {
        return {
            data_types: this.data_types && this.data_types.length ? this.data_types : undefined,
            patients: this.patients && this.patients.length ? this.patients : undefined,
        }
    }
}
