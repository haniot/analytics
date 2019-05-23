import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { Patient } from './patient'
import { FeedingHabitsRecord } from './feeding.habits.record'
import { SleepHabit } from './sleep.habit'
import { SociodemographicRecord } from './sociodemographic.record'
import { FamilyCohesionRecord } from './family.cohesion.record'
import { OralHealthRecord } from './oral.health.record'

export class OdontologicEvaluationRequest implements IJSONSerializable, IJSONDeserializable<OdontologicEvaluationRequest> {
    private _patient?: Patient
    private _measurements?: Array<any>
    private _feeding_habits_record?: FeedingHabitsRecord
    private _sleep_habit?: SleepHabit
    private _sociodemographic_record?: SociodemographicRecord
    private _family_cohesion_record?: FamilyCohesionRecord
    private _oral_health_record?: OralHealthRecord
    private _health_professional_id?: string

    get patient(): Patient | undefined {
        return this._patient
    }

    set patient(value: Patient | undefined) {
        this._patient = value
    }

    get measurements(): Array<any> | undefined {
        return this._measurements
    }

    set measurements(value: Array<any> | undefined) {
        this._measurements = value
    }

    get feeding_habits_record(): FeedingHabitsRecord | undefined {
        return this._feeding_habits_record
    }

    set feeding_habits_record(value: FeedingHabitsRecord | undefined) {
        this._feeding_habits_record = value
    }

    get sleep_habit(): SleepHabit | undefined {
        return this._sleep_habit
    }

    set sleep_habit(value: SleepHabit | undefined) {
        this._sleep_habit = value
    }

    get sociodemographic_record(): SociodemographicRecord | undefined {
        return this._sociodemographic_record
    }

    set sociodemographic_record(value: SociodemographicRecord | undefined) {
        this._sociodemographic_record = value
    }

    get family_cohesion_record(): FamilyCohesionRecord | undefined {
        return this._family_cohesion_record
    }

    set family_cohesion_record(value: FamilyCohesionRecord | undefined) {
        this._family_cohesion_record = value
    }

    get oral_health_record(): OralHealthRecord | undefined {
        return this._oral_health_record
    }

    set oral_health_record(value: OralHealthRecord | undefined) {
        this._oral_health_record = value
    }

    get health_professional_id(): string | undefined {
        return this._health_professional_id
    }

    set health_professional_id(value: string | undefined) {
        this._health_professional_id = value
    }

    public fromJSON(json: any): OdontologicEvaluationRequest {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.patient !== undefined) this.patient = new Patient().fromJSON(json.patient)
        if (json.feeding_habits_record !== undefined)
            this.feeding_habits_record = new FeedingHabitsRecord().fromJSON(json.feeding_habits_record)
        if (json.sleep_habit !== undefined) this.sleep_habit = new SleepHabit().fromJSON(json.sleep_habit)
        if (json.sociodemographic_record !== undefined)
            this.sociodemographic_record = new SociodemographicRecord().fromJSON(json.sociodemographic_record)
        if (json.family_cohesion_record !== undefined)
            this.family_cohesion_record = new FamilyCohesionRecord().fromJSON(json.family_cohesion_record)
        if (json.oral_health_record !== undefined)
            this.oral_health_record = new OralHealthRecord().fromJSON(json.oral_health_record)
        if (json.health_professional_id !== undefined) this.health_professional_id = json.health_professional_id

        return this
    }

    public toJSON(): any {
        return {
            patient: this.patient ? this.patient.toJSON() : undefined,
            measurement: this.measurements ? this.measurements.map(item => item.toJSON()) : undefined,
            feeding_habits_record: this.feeding_habits_record ? this.feeding_habits_record.toJSON() : undefined,
            sleep_habit: this.sleep_habit ? this.sleep_habit.toJSON() : undefined,
            sociodemographic_record: this.sociodemographic_record ? this.sociodemographic_record.toJSON() : undefined,
            family_cohesion_record: this.family_cohesion_record ? this.family_cohesion_record.toJSON() : undefined,
            oral_health_record: this.oral_health_record ? this.oral_health_record.toJSON() : undefined,
            health_professional_id: this.health_professional_id
        }
    }
}
