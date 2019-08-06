import { IJSONSerializable } from '../../application/domain/utils/json.serializable.interface'
import { Patient } from '../../application/domain/model/patient'
import { EvaluationTypes } from '../../application/domain/utils/evaluation.types'
import { Evaluation } from '../../application/domain/model/evaluation'
import { NutritionEvaluation } from '../../application/domain/model/nutrition.evaluation'

export class NutritionEvaluationList extends Evaluation implements IJSONSerializable {
    private _patient?: Patient
    private _nutritional_status?: string
    private _overweight_indicator?: string
    private _taylor_cut_point?: string
    private _blood_glucose?: string
    private _blood_pressure?: string

    constructor() {
        super()
        super.type = EvaluationTypes.NUTRITION
    }

    get patient(): Patient | undefined {
        return this._patient
    }

    set patient(value: Patient | undefined) {
        this._patient = value
    }

    get nutritional_status(): string | undefined {
        return this._nutritional_status
    }

    set nutritional_status(value: string | undefined) {
        this._nutritional_status = value
    }

    get overweight_indicator(): string | undefined {
        return this._overweight_indicator
    }

    set overweight_indicator(value: string | undefined) {
        this._overweight_indicator = value
    }

    get taylor_cut_point(): string | undefined {
        return this._taylor_cut_point
    }

    set taylor_cut_point(value: string | undefined) {
        this._taylor_cut_point = value
    }

    get blood_glucose(): string | undefined {
        return this._blood_glucose
    }

    set blood_glucose(value: string | undefined) {
        this._blood_glucose = value
    }

    get blood_pressure(): string | undefined {
        return this._blood_pressure
    }

    set blood_pressure(value: string | undefined) {
        this._blood_pressure = value
    }

    public fromModel(model: NutritionEvaluation): NutritionEvaluationList {
        if (!model) return this
        if (model.id !== undefined) super.id = model.id
        if (model.status !== undefined) this.status = model.status
        if (model.created_at !== undefined) this.created_at = model.created_at
        if (model.patient !== undefined) this.patient = model.patient
        if (model.nutritional_status !== undefined && model.nutritional_status.classification !== undefined)
            this.nutritional_status = model.nutritional_status.classification
        if (model.overweight_indicator !== undefined && model.overweight_indicator.classification !== undefined)
            this.overweight_indicator = model.overweight_indicator.classification
        if (model.taylor_cut_point !== undefined && model.taylor_cut_point.classification !== undefined)
            this.taylor_cut_point = model.taylor_cut_point.classification
        if (model.blood_glucose !== undefined && model.blood_glucose.classification !== undefined)
            this.blood_glucose = model.blood_glucose.classification
        if (model.blood_pressure !== undefined && model.blood_pressure.classification !== undefined)
            this.blood_pressure = model.blood_pressure.classification
        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{
                patient: this.patient ? this.patient.toJSON() : undefined,
                nutritional_status: this.nutritional_status,
                overweight_indicator: this.overweight_indicator,
                taylor_cut_point: this.taylor_cut_point,
                blood_glucose: this.blood_glucose,
                blood_pressure: this.blood_pressure
            }
        }
    }
}
