import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class NutritionCounseling implements IJSONSerializable, IJSONDeserializable<NutritionCounseling> {
    private _thinness_counseling?: Array<string>
    private _eutrophy_counseling?: Array<string>
    private _overweight_obesity_counseling?: Array<string>
    private _insulin_resistance_diabetes_counseling?: Array<string>
    private _hypertension_counseling?: Array<string>

    get thinness_counseling(): Array<string> | undefined {
        return this._thinness_counseling
    }

    set thinness_counseling(value: Array<string> | undefined) {
        this._thinness_counseling = value
    }

    get eutrophy_counseling(): Array<string> | undefined {
        return this._eutrophy_counseling
    }

    set eutrophy_counseling(value: Array<string> | undefined) {
        this._eutrophy_counseling = value
    }

    get overweight_obesity_counseling(): Array<string> | undefined {
        return this._overweight_obesity_counseling
    }

    set overweight_obesity_counseling(value: Array<string> | undefined) {
        this._overweight_obesity_counseling = value
    }

    get insulin_resistance_diabetes_counseling(): Array<string> | undefined {
        return this._insulin_resistance_diabetes_counseling
    }

    set insulin_resistance_diabetes_counseling(value: Array<string> | undefined) {
        this._insulin_resistance_diabetes_counseling = value
    }

    get hypertension_counseling(): Array<string> | undefined {
        return this._hypertension_counseling
    }

    set hypertension_counseling(value: Array<string> | undefined) {
        this._hypertension_counseling = value
    }

    public fromJSON(json: any): NutritionCounseling {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.thinness_counseling !== undefined && json.thinness_counseling.length) {
            this.thinness_counseling = json.thinness_counseling
        }

        if (json.eutrophy_counseling !== undefined && json.eutrophy_counseling.length) {
            this.eutrophy_counseling = json.eutrophy_counseling
        }

        if (json.overweight_obesity_counseling !== undefined && json.overweight_obesity_counseling.length) {
            this.overweight_obesity_counseling = json.overweight_obesity_counseling
        }

        if (json.insulin_resistance_diabetes_counseling !== undefined && json.insulin_resistance_diabetes_counseling.length) {
            this.insulin_resistance_diabetes_counseling = json.insulin_resistance_diabetes_counseling
        }

        if (json.hypertension_counseling !== undefined && json.hypertension_counseling.length) {
            this.hypertension_counseling = json.hypertension_counseling
        }

        return this
    }

    public toJSON(): any {
        return {
            thinness_counseling: this.thinness_counseling && this.thinness_counseling.length ?
                this.thinness_counseling : undefined,
            eutrophy_counseling: this.eutrophy_counseling && this.eutrophy_counseling.length ?
                this.eutrophy_counseling : undefined,
            overweight_obesity_counseling: this.overweight_obesity_counseling && this.overweight_obesity_counseling.length ?
                this.overweight_obesity_counseling : undefined,
            insulin_resistance_diabetes_counseling:
                this.insulin_resistance_diabetes_counseling && this.insulin_resistance_diabetes_counseling.length ?
                    this.insulin_resistance_diabetes_counseling : undefined,
            hypertension_counseling: this.hypertension_counseling && this.hypertension_counseling.length ?
                this.hypertension_counseling : undefined

        }
    }

}
