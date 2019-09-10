import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { BloodPressureSystolicPercentileTypes } from '../utils/blood.pressure.systolic.percentile.types'
import { BloodPressureDiastolicPercentileTypes } from '../utils/blood.pressure.diastolic.percentile.types'
import { BloodPressurePercentileClassificationTypes } from '../utils/blood.pressure.percentile.classification.types'

export class BloodPressure implements IJSONSerializable, IJSONDeserializable<BloodPressure> {
    private _systolic?: number
    private _diastolic?: number
    private _systolic_percentile?: BloodPressureSystolicPercentileTypes
    private _diastolic_percentile?: BloodPressureDiastolicPercentileTypes
    private _classification?: BloodPressurePercentileClassificationTypes

    get systolic(): number | undefined {
        return this._systolic
    }

    set systolic(value: number | undefined) {
        this._systolic = value
    }

    get diastolic(): number | undefined {
        return this._diastolic
    }

    set diastolic(value: number | undefined) {
        this._diastolic = value
    }

    get systolic_percentile(): BloodPressureSystolicPercentileTypes | undefined {
        return this._systolic_percentile
    }

    set systolic_percentile(value: BloodPressureSystolicPercentileTypes | undefined) {
        this._systolic_percentile = value
    }

    get diastolic_percentile(): BloodPressureDiastolicPercentileTypes | undefined {
        return this._diastolic_percentile
    }

    set diastolic_percentile(value: BloodPressureDiastolicPercentileTypes | undefined) {
        this._diastolic_percentile = value
    }

    get classification(): BloodPressurePercentileClassificationTypes | undefined {
        return this._classification
    }

    set classification(value: BloodPressurePercentileClassificationTypes | undefined) {
        this._classification = value
    }

    public fromJSON(json: any): BloodPressure {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.systolic !== undefined) this.systolic = json.systolic
        if (json.diastolic !== undefined) this.diastolic = json.diastolic
        if (json.systolic_percentile !== undefined) this.systolic_percentile = json.systolic_percentile
        if (json.diastolic_percentile !== undefined) this.diastolic_percentile = json.diastolic_percentile
        if (json.classification !== undefined) this.classification = json.classification
        return this
    }

    public toJSON(): any {
        return {
            systolic: this.systolic,
            diastolic: this.diastolic,
            systolic_percentile: this.systolic_percentile,
            diastolic_percentile: this.diastolic_percentile,
            classification: this.classification
        }
    }

}
