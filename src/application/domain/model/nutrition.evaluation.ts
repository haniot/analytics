import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { NutritionalStatus } from './nutritional.status'
import { OverweightIndicator } from './overweight.indicator'
import { HeartRate } from './heart.rate'
import { BloodGlucose } from './blood.glucose'
import { JsonUtils } from '../utils/json.utils'
import { Evaluation } from './evaluation'
import { EvaluationTypes } from '../utils/evaluation.types'
import { BloodPressure } from './blood.pressure'
import { Counseling } from './counseling'

export class NutritionEvaluation extends Evaluation implements IJSONSerializable, IJSONDeserializable<NutritionEvaluation> {
    private _nutritional_status?: NutritionalStatus
    private _overweight_indicator?: OverweightIndicator
    private _heart_rate?: HeartRate
    private _blood_glucose?: BloodGlucose
    private _blood_pressure?: BloodPressure
    private _counseling?: Array<Counseling>

    constructor() {
        super()
        super.type = EvaluationTypes.NUTRITION
    }

    get nutritional_status(): NutritionalStatus | undefined {
        return this._nutritional_status
    }

    set nutritional_status(value: NutritionalStatus | undefined) {
        this._nutritional_status = value
    }

    get overweight_indicator(): OverweightIndicator | undefined {
        return this._overweight_indicator
    }

    set overweight_indicator(value: OverweightIndicator | undefined) {
        this._overweight_indicator = value
    }

    get heart_rate(): HeartRate | undefined {
        return this._heart_rate
    }

    set heart_rate(value: HeartRate | undefined) {
        this._heart_rate = value
    }

    get blood_glucose(): BloodGlucose | undefined {
        return this._blood_glucose
    }

    set blood_glucose(value: BloodGlucose | undefined) {
        this._blood_glucose = value
    }

    get blood_pressure(): BloodPressure | undefined {
        return this._blood_pressure
    }

    set blood_pressure(value: BloodPressure | undefined) {
        this._blood_pressure = value
    }

    get counseling(): Array<Counseling> | undefined {
        return this._counseling
    }

    set counseling(value: Array<Counseling> | undefined) {
        this._counseling = value
    }

    public async addCounseling(counseling: Counseling | Array<Counseling>) {
        if (!this.counseling) this.counseling = []
        if (counseling instanceof Array) counseling.forEach(council => this.addCounseling(council))
        else this.counseling.push(counseling)
    }

    public fromJSON(json: any): NutritionEvaluation {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        super.fromJSON(json)
        if (json.status !== undefined) this.status = json.status
        if (json.created_at !== undefined) this.created_at = json.created_at
        if (json.nutritional_status !== undefined)
            this.nutritional_status = new NutritionalStatus().fromJSON(json.nutritional_status)
        if (json.overweight_indicator !== undefined)
            this.overweight_indicator = new OverweightIndicator().fromJSON(json.overweight_indicator)
        if (json.heart_rate !== undefined) this.heart_rate = new HeartRate().fromJSON(json.heart_rate)
        if (json.blood_glucose !== undefined) this.blood_glucose = new BloodGlucose().fromJSON(json.blood_glucose)
        if (json.blood_pressure !== undefined) this.blood_pressure = new BloodPressure().fromJSON(json.blood_pressure)
        if (json.counseling !== undefined)
            this.counseling = json.counseling.map(item => new Counseling().fromJSON(item))
        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{
                nutritional_status: this.nutritional_status ? this.nutritional_status.toJSON() : undefined,
                overweight_indicator: this.overweight_indicator ? this.overweight_indicator.toJSON() : undefined,
                heart_rate: this.heart_rate ? this.heart_rate.toJSON() : undefined,
                blood_glucose: this.blood_glucose ? this.blood_glucose.toJSON() : undefined,
                blood_pressure: this.blood_pressure ? this.blood_pressure.toJSON() : undefined,
                counseling: this.counseling && this.counseling.length ? this.counseling.map(item => item.toJSON()) : []
            }
        }
    }
}
