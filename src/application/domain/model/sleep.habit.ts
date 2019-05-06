import { JsonUtils } from '../utils/json.utils'
import { QuestionnaireTypes } from '../utils/questionnaire.types'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { QuestionnaireRecord } from './questionnaire.record'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'

export class SleepHabit extends QuestionnaireRecord implements IJSONSerializable, IJSONDeserializable<SleepHabit> {

    private _week_day_sleep?: number
    private _week_day_wake_up?: number

    constructor() {
        super()
        super.type = QuestionnaireTypes.SLEEP_HABIT
    }

    get week_day_sleep(): number | undefined {
        return this._week_day_sleep
    }

    set week_day_sleep(value: number | undefined) {
        this._week_day_sleep = value
    }

    get week_day_wake_up(): number | undefined {
        return this._week_day_wake_up
    }

    set week_day_wake_up(value: number | undefined) {
        this._week_day_wake_up = value
    }

    public fromJSON(json: any): SleepHabit {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        super.fromJSON(json)
        if (json.week_day_sleep !== undefined) this.week_day_sleep = json.week_day_sleep
        if (json.week_day_wake_up  !== undefined) this.week_day_wake_up = json.week_day_wake_up

        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{ week_day_sleep: this.week_day_sleep, week_day_wake_up: this.week_day_wake_up }
        }
    }

}
