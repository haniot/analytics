import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { AgeBmiPercentile } from './age.bmi.percentile'
import { JsonUtils } from '../utils/json.utils'

export class BmiPerAge implements IJSONSerializable, IJSONDeserializable<BmiPerAge> {
    private _bmi_per_age_boys?: Array<AgeBmiPercentile>
    private _bmi_per_age_girls?: Array<AgeBmiPercentile>

    get bmi_per_age_boys(): Array<AgeBmiPercentile> | undefined {
        return this._bmi_per_age_boys
    }

    set bmi_per_age_boys(value: Array<AgeBmiPercentile> | undefined) {
        this._bmi_per_age_boys = value
    }

    get bmi_per_age_girls(): Array<AgeBmiPercentile> | undefined {
        return this._bmi_per_age_girls
    }

    set bmi_per_age_girls(value: Array<AgeBmiPercentile> | undefined) {
        this._bmi_per_age_girls = value
    }

    public fromJSON(json: any): BmiPerAge {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.bmi_per_age_boys !== undefined && json.bmi_per_age_boys.length) {
            this.bmi_per_age_boys = json.bmi_per_age_boys.map(item => new AgeBmiPercentile().fromJSON(item))
        }
        if (json.bmi_per_age_girls !== undefined && json.bmi_per_age_girls.length) {
            this.bmi_per_age_girls = json.bmi_per_age_girls.map(item => new AgeBmiPercentile().fromJSON(item))
        }

        return this
    }

    public toJSON(): any {
        return {
            bmi_per_age_boys: this.bmi_per_age_boys && this.bmi_per_age_boys.length ?
                this.bmi_per_age_boys.map(item => item.toJSON()) : undefined,
            bmi_per_age_girls: this.bmi_per_age_girls && this.bmi_per_age_girls.length ?
                this.bmi_per_age_girls.map(item => item.toJSON()) : undefined
        }
    }

}
