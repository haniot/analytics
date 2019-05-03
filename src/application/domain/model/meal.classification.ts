import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { MealClassificationLevel } from './meal.classification.level'
import { JsonUtils } from '../utils/json.utils'

export class MealClassification implements IJSONSerializable, IJSONDeserializable<MealClassification> {
    private _good?: MealClassificationLevel
    private _great?: MealClassificationLevel

    get good(): MealClassificationLevel | undefined {
        return this._good
    }

    set good(value: MealClassificationLevel | undefined) {
        this._good = value
    }

    get great(): MealClassificationLevel | undefined {
        return this._great
    }

    set great(value: MealClassificationLevel | undefined) {
        this._great = value
    }

    public fromJSON(json: any): MealClassification {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.good !== undefined) this.good = new MealClassificationLevel().fromJSON(json.good)
        if (json.great !== undefined) this.great = new MealClassificationLevel().fromJSON(json.great)
        return this
    }

    public toJSON(): any {
        return {
            good: this.good ? this.good.toJSON : undefined,
            great: this.great ? this.great.toJSON() : undefined
        }
    }

}
