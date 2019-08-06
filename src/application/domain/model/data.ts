import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { Entity } from './entity'
import { JsonUtils } from '../utils/json.utils'
import { DatetimeValidator } from '../validator/date.time.validator'

export class Data extends Entity implements IJSONSerializable, IJSONDeserializable<Data> {
    private _created_at?: Date
    private _total_patients?: number
    private _file_csv?: string
    private _file_xls?: string
    private _pilotstudy_id?: string
    private _patients?: Array<string>
    private _data_types?: Array<string>

    constructor() {
        super()
    }

    get created_at(): Date | undefined {
        return this._created_at
    }

    set created_at(value: Date | undefined) {
        this._created_at = value
    }

    get total_patients(): number | undefined {
        return this._total_patients
    }

    set total_patients(value: number | undefined) {
        this._total_patients = value
    }

    get file_csv(): string | undefined {
        return this._file_csv
    }

    set file_csv(value: string | undefined) {
        this._file_csv = value
    }

    get file_xls(): string | undefined {
        return this._file_xls
    }

    set file_xls(value: string | undefined) {
        this._file_xls = value
    }

    get pilotstudy_id(): string | undefined {
        return this._pilotstudy_id
    }

    set pilotstudy_id(value: string | undefined) {
        this._pilotstudy_id = value
    }

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

    public convertDatetimeString(value: string): Date {
        DatetimeValidator.validate(value)
        return new Date(value)
    }

    public fromJSON(json: any): Data {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.created_at !== undefined) this.created_at = this.convertDatetimeString(json.created_at)
        if (json.total_patients !== undefined) this.total_patients = json.total_patients
        if (json.file_csv !== undefined) this.file_csv = json.file_csv
        if (json.file_xls !== undefined) this.file_xls = json.file_xls
        if (json.pilotstudy_id !== undefined) this.pilotstudy_id = json.pilotstudy_id
        if (json.patients !== undefined && json.patients instanceof Array) this.patients = json.patients
        if (json.data_types !== undefined && json.data_types instanceof Array) this.data_types = json.data_types
        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            created_at: this.created_at,
            total_patients: this.total_patients,
            file_csv: this.file_csv,
            file_xls: this.file_xls,
            pilotstudy_id: this.pilotstudy_id,
            data_types: this.data_types && this.data_types.length ? this.data_types : undefined,
            patients: this.patients && this.patients.length ? this.patients : undefined
        }
    }

}
