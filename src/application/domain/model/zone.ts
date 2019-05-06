import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { MealClassification } from './meal.classification'
import { JsonUtils } from '../utils/json.utils'

export class Zone implements IJSONSerializable, IJSONDeserializable<Zone> {
    private _preprandial?: MealClassification
    private _postprandial?: MealClassification
    private _before_sleep?: MealClassification
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

    get before_sleep(): MealClassification | undefined {
        return this._before_sleep
    }

    set before_sleep(value: MealClassification | undefined) {
        this._before_sleep = value
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
        if (json.before_sleep !== undefined) this.before_sleep = new MealClassification().fromJSON(json.before_sleep)
        if (json.glycated_hemoglobin !== undefined)
            this.glycated_hemoglobin = new MealClassification().fromJSON(json.glycated_hemoglobin)
        return this
    }

    public toJSON(): any {
        return {
            preprandial: this.preprandial ? this.preprandial.toJSON() : undefined,
            postprandial: this.postprandial ? this.postprandial.toJSON() : undefined,
            before_sleep: this.before_sleep ? this.before_sleep.toJSON() : undefined,
            glycated_hemoglobin: this.glycated_hemoglobin ? this.glycated_hemoglobin.toJSON() : undefined
        }
    }
}
