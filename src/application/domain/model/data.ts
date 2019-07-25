import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { Entity } from './entity'
import { JsonUtils } from '../utils/json.utils'
import { EvaluationTypes } from '../utils/evaluation.types'
import { DatetimeValidator } from '../validator/date.time.validator'

export class Data extends Entity implements IJSONSerializable, IJSONDeserializable<Data> {
    private _type?: string
    private _created_at?: Date
    private _total_patients?: number
    private _file_csv?: string
    private _file_xls?: string
    private _health_professional_id?: string
    private _pilotstudy_id?: string

    constructor() {
        super()
        this.type = EvaluationTypes.ODONTOLOGIC
    }

    get type(): string | undefined {
        return this._type
    }

    set type(value: string | undefined) {
        this._type = value
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

    get health_professional_id(): string | undefined {
        return this._health_professional_id
    }

    set health_professional_id(value: string | undefined) {
        this._health_professional_id = value
    }

    get pilotstudy_id(): string | undefined {
        return this._pilotstudy_id
    }

    set pilotstudy_id(value: string | undefined) {
        this._pilotstudy_id = value
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
        if (json.health_professional_id !== undefined) this.health_professional_id = json.health_professional_id
        if (json.pilotstudy_id !== undefined) this.pilotstudy_id = json.pilotstudy_id
        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            created_at: this.created_at,
            total_patients: this.total_patients,
            file_csv: this.file_csv,
            file_xls: this.file_xls,
            health_professional_id: this.health_professional_id,
            pilotstudy_id: this.pilotstudy_id
        }
    }

}
