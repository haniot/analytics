import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { MealClassification } from './meal.classification'
import { JsonUtils } from '../utils/json.utils'

export class Zone implements IJSONSerializable, IJSONDeserializable<Zone> {
    private _preprandial?: MealClassification
    private _postprandial?: MealClassification
    private _bedtime?: MealClassification
    private _glycated_hemoglobin?: MealClassification

    get preprandial(): MealClassification | undefined {
        return this._preprandial
    }

    set preprandial(value: MealClassification | undefined) {
        this._preprandial = value
    }

    get postprandial(): MealClassification | undefined {
        return this._postprandial
    }

    set postprandial(value: MealClassification | undefined) {
        this._postprandial = value
    }

    get bedtime(): MealClassification | undefined {
        return this._bedtime
    }

    set bedtime(value: MealClassification | undefined) {
        this._bedtime = value
    }

    get glycated_hemoglobin(): MealClassification | undefined {
        return this._glycated_hemoglobin
    }

    set glycated_hemoglobin(value: MealClassification | undefined) {
        this._glycated_hemoglobin = value
    }

    public fromJSON(json: any): Zone {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.preprandial !== undefined) this.preprandial = new MealClassification().fromJSON(json.preprandial)
        if (json.postprandial !== undefined) this.postprandial = new MealClassification().fromJSON(json.postprandial)
        if (json.bedtime !== undefined) this.bedtime = new MealClassification().fromJSON(json.bedtime)
        if (json.glycated_hemoglobin !== undefined)
            this.glycated_hemoglobin = new MealClassification().fromJSON(json.glycated_hemoglobin)
        return this
    }

    public toJSON(): any {
        return {
            preprandial: this.preprandial ? this.preprandial.toJSON() : undefined,
            postprandial: this.postprandial ? this.postprandial.toJSON() : undefined,
            bedtime: this.bedtime ? this.bedtime.toJSON() : undefined,
            glycated_hemoglobin: this.glycated_hemoglobin ? this.glycated_hemoglobin.toJSON() : undefined
        }
    }
}
