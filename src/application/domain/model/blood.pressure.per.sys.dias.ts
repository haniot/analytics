import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { AgeSystolicDiastolicPercentile } from './age.systolic.diastolic.percentile'

export class BloodPressurePerSysDias
    implements IJSONSerializable, IJSONDeserializable<BloodPressurePerSysDias> {
    private _age_systolic_diastolic_percentile_boys?: Array<AgeSystolicDiastolicPercentile>
    private _age_systolic_diastolic_percentile_girls?: Array<AgeSystolicDiastolicPercentile>

    get age_systolic_diastolic_percentile_boys(): Array<AgeSystolicDiastolicPercentile> | undefined {
        return this._age_systolic_diastolic_percentile_boys
    }

    set age_systolic_diastolic_percentile_boys(value: Array<AgeSystolicDiastolicPercentile> | undefined) {
        this._age_systolic_diastolic_percentile_boys = value
    }

    get age_systolic_diastolic_percentile_girls(): Array<AgeSystolicDiastolicPercentile> | undefined {
        return this._age_systolic_diastolic_percentile_girls
    }

    set age_systolic_diastolic_percentile_girls(value: Array<AgeSystolicDiastolicPercentile> | undefined) {
        this._age_systolic_diastolic_percentile_girls = value
    }

    public fromJSON(json: any): BloodPressurePerSysDias {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.age_systolic_diastolic_percentile_boys !== undefined && json.age_systolic_diastolic_percentile_boys.length) {
            this.age_systolic_diastolic_percentile_boys =
                json.age_systolic_diastolic_percentile_boys.map(item => new AgeSystolicDiastolicPercentile().fromJSON(item))
        }
        if (json.age_systolic_diastolic_percentile_girls !== undefined && json.age_systolic_diastolic_percentile_girls.length) {
            this.age_systolic_diastolic_percentile_girls =
                json.age_systolic_diastolic_percentile_girls.map(item => new AgeSystolicDiastolicPercentile().fromJSON(item))
        }
        return this
    }

    public toJSON(): any {
        return {
            age_systolic_diastolic_percentile_boys:
                this.age_systolic_diastolic_percentile_boys && this.age_systolic_diastolic_percentile_boys.length ?
                    this.age_systolic_diastolic_percentile_boys.map(item => item.toJSON()) : undefined,
            age_systolic_diastolic_percentile_girls:
                this.age_systolic_diastolic_percentile_girls && this.age_systolic_diastolic_percentile_girls.length ?
                    this.age_systolic_diastolic_percentile_girls.map(item => item.toJSON()) : undefined
        }
    }

}
