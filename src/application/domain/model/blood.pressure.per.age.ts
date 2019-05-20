import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { AgeHeightPercentile } from './age.height.percentile'
import { JsonUtils } from '../utils/json.utils'

export class BloodPressurePerAge implements IJSONSerializable, IJSONDeserializable<BloodPressurePerAge> {
    private _blood_pressure_per_age_boys?: Array<AgeHeightPercentile>
    private _blood_pressure_per_age_girls?: Array<AgeHeightPercentile>

    get blood_pressure_per_age_boys(): Array<AgeHeightPercentile> | undefined {
        return this._blood_pressure_per_age_boys
    }

    set blood_pressure_per_age_boys(value: Array<AgeHeightPercentile> | undefined) {
        this._blood_pressure_per_age_boys = value
    }

    get blood_pressure_per_age_girls(): Array<AgeHeightPercentile> | undefined {
        return this._blood_pressure_per_age_girls
    }

    set blood_pressure_per_age_girls(value: Array<AgeHeightPercentile> | undefined) {
        this._blood_pressure_per_age_girls = value
    }

    public fromJSON(json: any): BloodPressurePerAge {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.blood_pressure_per_age_boys !== undefined && json.blood_pressure_per_age_boys.length) {
            this.blood_pressure_per_age_boys =
                json.blood_pressure_per_age_boys.map(item => new AgeHeightPercentile().fromJSON(item))
        }

        if (json.blood_pressure_per_age_girls !== undefined && json.blood_pressure_per_age_girls.length) {
            this.blood_pressure_per_age_girls =
                json.blood_pressure_per_age_girls.map(item => new AgeHeightPercentile().fromJSON(item))
        }
        return this
    }

    public toJSON(): any {
        return {
            blood_pressure_per_age_boys: this.blood_pressure_per_age_boys && this.blood_pressure_per_age_boys.length ?
                this.blood_pressure_per_age_boys.map(item => item.toJSON()) : undefined,
            blood_pressure_per_age_girls: this.blood_pressure_per_age_girls && this.blood_pressure_per_age_girls.length ?
                this.blood_pressure_per_age_girls.map(item => item.toJSON()) : undefined
        }
    }

}
