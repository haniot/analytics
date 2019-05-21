import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { Patient } from './patient'
import { PhysicalActivityHabits } from './physical.activity.habits'
import { FeedingHabitsRecord } from './feeding.habits.record'
import { MedicalRecord } from './medical.record'
import { JsonUtils } from '../utils/json.utils'
import { SleepHabit } from './sleep.habit'

export class EvaluationRequest implements IJSONSerializable, IJSONDeserializable<EvaluationRequest> {
    private _patient?: Patient
    private _measurements?: Array<any>
    private _physical_activity_habits?: PhysicalActivityHabits
    private _feeding_habits_record?: FeedingHabitsRecord
    private _medical_record?: MedicalRecord
    private _sleep_habit?: SleepHabit
    private _health_professional_id?: string
    private _pilotstudy_id?: string

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

    get physical_activity_habits(): PhysicalActivityHabits | undefined {
        return this._physical_activity_habits
    }

    set physical_activity_habits(value: PhysicalActivityHabits | undefined) {
        this._physical_activity_habits = value
    }

    get feeding_habits_record(): FeedingHabitsRecord | undefined {
        return this._feeding_habits_record
    }

    set feeding_habits_record(value: FeedingHabitsRecord | undefined) {
        this._feeding_habits_record = value
    }

    get medical_record(): MedicalRecord | undefined {
        return this._medical_record
    }

    set medical_record(value: MedicalRecord | undefined) {
        this._medical_record = value
    }

    get sleep_habit(): SleepHabit | undefined {
        return this._sleep_habit
    }

    set sleep_habit(value: SleepHabit | undefined) {
        this._sleep_habit = value
    }

    get health_professional_id(): string | undefined {
        return this._health_professional_id
    }

    set health_professional_id(value: string | undefined) {
        this._health_professional_id = value
    }

    get pilotstudy_id(): string | undefined {
        return this._pilotstudy_id
    }

    set pilotstudy_id(value: string | undefined) {
        this._pilotstudy_id = value
    }

    public fromJSON(json: any): EvaluationRequest {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.patient !== undefined) this.patient = new Patient().fromJSON(json.patient)
        if (json.physical_activity_habits !== undefined)
            this.physical_activity_habits = new PhysicalActivityHabits().fromJSON(json.physical_activity_habits)
        if (json.feeding_habits_record !== undefined)
            this.feeding_habits_record = new FeedingHabitsRecord().fromJSON(json.feeding_habits_record)
        if (json.medical_record !== undefined) this.medical_record = new MedicalRecord().fromJSON(json.medical_record)
        if (json.sleep_habit !== undefined) this.sleep_habit = new SleepHabit().fromJSON(json.sleep_habit)
        if (json.health_professional_id !== undefined) this.health_professional_id = json.health_professional_id
        if (json.pilotstudy_id !== undefined) this.pilotstudy_id = json.pilotstudy_id
        return this
    }

    public toJSON(): any {
        return {
            patient: this.patient ? this.patient.toJSON() : undefined,
            measurement: this.measurements ? this.measurements.map(item => item.toJSON()) : undefined,
            physical_activity_habits: this.physical_activity_habits ? this.physical_activity_habits.toJSON() : undefined,
            feeding_habits_record: this.feeding_habits_record ? this.feeding_habits_record.toJSON() : undefined,
            medical_record: this.medical_record ? this.medical_record.toJSON() : undefined,
            sleep_habit: this.sleep_habit ? this.sleep_habit.toJSON() : undefined,
            health_professional_id: this.health_professional_id,
            pilotstudy_id: this.pilotstudy_id
        }
    }
}
