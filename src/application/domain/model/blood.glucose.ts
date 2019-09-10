import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { MealTypes } from '../utils/meal.types'
import { BloodGlucoseClassificationTypes } from '../utils/blood.glucose.classification.types'

export class BloodGlucose implements IJSONSerializable, IJSONDeserializable<BloodGlucose> {
    private _value?: number
    private _meal?: MealTypes
    private _classification?: BloodGlucoseClassificationTypes

    get value(): number | undefined {
        return this._value
    }

    set value(value: number | undefined) {
        this._value = value
    }

    get meal(): MealTypes | undefined {
        return this._meal
    }

    set meal(value: MealTypes | undefined) {
        this._meal = value
    }

    get classification(): BloodGlucoseClassificationTypes | undefined {
        return this._classification
    }

    set classification(value: BloodGlucoseClassificationTypes | undefined) {
        this._classification = value
    }

    public fromJSON(json: any): BloodGlucose {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.value !== undefined) this.value = json.value
        if (json.meal !== undefined) this.meal = json.meal
        if (json.classification !== undefined) this.classification = json.classification

        return this
    }

    public toJSON(): any {
        return {
            value: this.value,
            meal: this.meal,
            classification: this.classification
        }
    }

}
