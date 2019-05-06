import { Measurement } from './measurement'
import { MeasurementTypes } from '../utils/measurement.types'
import { JsonUtils } from '../utils/json.utils'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { DataSetItem } from './data.set.item'

export class HeartRateMeasurement extends Measurement implements IJSONSerializable, IJSONDeserializable<HeartRateMeasurement> {
    private _dataset?: Array<DataSetItem>

    constructor() {
        super()
        super.type = MeasurementTypes.HEART_RATE
    }

    get dataset(): Array<DataSetItem> | undefined {
        return this._dataset
    }

    set dataset(value: Array<DataSetItem> | undefined) {
        this._dataset = value
    }

    public fromJSON(json: any): HeartRateMeasurement {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }
        super.fromJSON(json)
        if (json.dataset !== undefined && json.dataset.length) {
            this.dataset = json.dataset.map(item => new DataSetItem().fromJSON(item))
        }
        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{ dataset: this.dataset && this.dataset.length ? this.dataset.map(item => item.toJSON()) : [] }
        }
    }
}
