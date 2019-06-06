import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class AgeSystolicDiastolicPercentile implements IJSONSerializable, IJSONDeserializable<AgeSystolicDiastolicPercentile> {
    private _age?: number
    private _percentile?: number
    private _pas_5?: number
    private _pas_10?: number
    private _pas_25?: number
    private _pas_50?: number
    private _pas_75?: number
    private _pas_90?: number
    private _pas_95?: number
    private _pad_5?: number
    private _pad_10?: number
    private _pad_25?: number
    private _pad_50?: number
    private _pad_75?: number
    private _pad_90?: number
    private _pad_95?: number

    get age(): number | undefined {
        return this._age
    }

    set age(value: number | undefined) {
        this._age = value
    }

    get percentile(): number | undefined {
        return this._percentile
    }

    set percentile(value: number | undefined) {
        this._percentile = value
    }

    get pas_5(): number | undefined {
        return this._pas_5
    }

    set pas_5(value: number | undefined) {
        this._pas_5 = value
    }

    get pas_10(): number | undefined {
        return this._pas_10
    }

    set pas_10(value: number | undefined) {
        this._pas_10 = value
    }

    get pas_25(): number | undefined {
        return this._pas_25
    }

    set pas_25(value: number | undefined) {
        this._pas_25 = value
    }

    get pas_50(): number | undefined {
        return this._pas_50
    }

    set pas_50(value: number | undefined) {
        this._pas_50 = value
    }

    get pas_75(): number | undefined {
        return this._pas_75
    }

    set pas_75(value: number | undefined) {
        this._pas_75 = value
    }

    get pas_90(): number | undefined {
        return this._pas_90
    }

    set pas_90(value: number | undefined) {
        this._pas_90 = value
    }

    get pas_95(): number | undefined {
        return this._pas_95
    }

    set pas_95(value: number | undefined) {
        this._pas_95 = value
    }

    get pad_5(): number | undefined {
        return this._pad_5
    }

    set pad_5(value: number | undefined) {
        this._pad_5 = value
    }

    get pad_10(): number | undefined {
        return this._pad_10
    }

    set pad_10(value: number | undefined) {
        this._pad_10 = value
    }

    get pad_25(): number | undefined {
        return this._pad_25
    }

    set pad_25(value: number | undefined) {
        this._pad_25 = value
    }

    get pad_50(): number | undefined {
        return this._pad_50
    }

    set pad_50(value: number | undefined) {
        this._pad_50 = value
    }

    get pad_75(): number | undefined {
        return this._pad_75
    }

    set pad_75(value: number | undefined) {
        this._pad_75 = value
    }

    get pad_90(): number | undefined {
        return this._pad_90
    }

    set pad_90(value: number | undefined) {
        this._pad_90 = value
    }

    get pad_95(): number | undefined {
        return this._pad_95
    }

    set pad_95(value: number | undefined) {
        this._pad_95 = value
    }

    public fromJSON(json: any): AgeSystolicDiastolicPercentile {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.age !== undefined) this.age = json.age
        if (json.percentile !== undefined) this.percentile = json.percentile
        if (json.pas_5 !== undefined) this.pas_5 = json.pas_5
        if (json.pas_10 !== undefined) this.pas_10 = json.pas_10
        if (json.pas_25 !== undefined) this.pas_25 = json.pas_25
        if (json.pas_50 !== undefined) this.pas_50 = json.pas_50
        if (json.pas_75 !== undefined) this.pas_75 = json.pas_75
        if (json.pas_90 !== undefined) this.pas_90 = json.pas_90
        if (json.pas_95 !== undefined) this.pas_95 = json.pas_95
        if (json.pad_5 !== undefined) this.pad_5 = json.pad_5
        if (json.pad_10 !== undefined) this.pad_10 = json.pad_10
        if (json.pad_25 !== undefined) this.pad_25 = json.pad_25
        if (json.pad_50 !== undefined) this.pad_50 = json.pad_50
        if (json.pad_75 !== undefined) this.pad_75 = json.pad_75
        if (json.pad_90 !== undefined) this.pad_90 = json.pad_90
        if (json.pad_95 !== undefined) this.pad_95 = json.pad_95
        return this
    }

    public toJSON(): any {
        return {
            age: this.age,
            percentile: this.percentile,
            pas_5: this.pas_5,
            pas_10: this.pas_10,
            pas_25: this.pas_25,
            pas_50: this.pas_50,
            pas_75: this.pas_75,
            pas_90: this.pas_90,
            pas_95: this.pas_95,
            pad_5: this.pad_5,
            pad_10: this.pad_10,
            pad_25: this.pad_25,
            pad_50: this.pad_50,
            pad_75: this.pad_75,
            pad_90: this.pad_90,
            pad_95: this.pad_95
        }
    }
}
