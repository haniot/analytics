import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { DataSetItem } from './data.set.item'

export class HeartRate implements IJSONSerializable, IJSONDeserializable<HeartRate> {
    private _min?: number
    private _max?: number
    private _average?: number
    private _dataset?: Array<DataSetItem>

    get min(): number | undefined {
        return this._min
    }

    set min(value: number | undefined) {
        this._min = value
    }

    get max(): number | undefined {
        return this._max
    }

    set max(value: number | undefined) {
        this._max = value
    }

    get average(): number | undefined {
        return this._average
    }

    set average(value: number | undefined) {
        this._average = value
    }

    get dataset(): Array<DataSetItem> | undefined {
        return this._dataset
    }

    set dataset(value: Array<DataSetItem> | undefined) {
        this._dataset = value
    }

    public fromJSON(json: any): HeartRate {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }
        if (json.min !== undefined) this.min = json.min
        if (json.max !== undefined) this.max = json.max
        if (json.average !== undefined) this.average = json.average
        if (json.dataset !== undefined && json.dataset.length) {
            this.dataset = json.dataset.map(item => new DataSetItem().fromJSON(item))
        }
        return this
    }

    public toJSON(): any {
        return {
            min: this.min,
            max: this.max,
            average: this.average,
            dataset: this.dataset && this.dataset.length ? this.dataset.map(item => item.toJSON()) : undefined
        }
    }
}
