import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { NutritionStatus } from './nutrition.status'
import { OverweightIndicator } from './overweight.indicator'
import { BloodGlucose } from './blood.glucose'
import { JsonUtils } from '../utils/json.utils'
import { Evaluation } from './evaluation'
import { EvaluationTypes } from '../utils/evaluation.types'
import { BloodPressure } from './blood.pressure'
import { Counseling } from './counseling'
import { PhysicalActivityHabits } from './physical.activity.habits'
import { FeedingHabitsRecord } from './feeding.habits.record'
import { MedicalRecord } from './medical.record'
import { SleepHabit } from './sleep.habit'
import { Patient } from './patient'
import { TaylorCutPoint } from './taylor.cut.point'

export class NutritionEvaluation extends Evaluation implements IJSONSerializable, IJSONDeserializable<NutritionEvaluation> {
    private _patient?: Patient
    private _nutritional_status?: NutritionStatus
    private _overweight_indicator?: OverweightIndicator
    private _taylor_cut_point?: TaylorCutPoint
    private _blood_glucose?: BloodGlucose
    private _blood_pressure?: BloodPressure
    private _counseling?: Counseling
    private _measurements?: Array<any>
    private _physical_activity_habits?: PhysicalActivityHabits
    private _feeding_habits_record?: FeedingHabitsRecord
    private _medical_record?: MedicalRecord
    private _sleep_habit?: SleepHabit

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

    get nutritional_status(): NutritionStatus | undefined {
        return this._nutritional_status
    }

    set nutritional_status(value: NutritionStatus | undefined) {
        this._nutritional_status = value
    }

    get overweight_indicator(): OverweightIndicator | undefined {
        return this._overweight_indicator
    }

    set overweight_indicator(value: OverweightIndicator | undefined) {
        this._overweight_indicator = value
    }

    get taylor_cut_point(): TaylorCutPoint | undefined {
        return this._taylor_cut_point
    }

    set taylor_cut_point(value: TaylorCutPoint | undefined) {
        this._taylor_cut_point = value
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

    get counseling(): Counseling | undefined {
        return this._counseling
    }

    set counseling(value: Counseling | undefined) {
        this._counseling = value
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

    public fromJSON(json: any): NutritionEvaluation {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        super.fromJSON(json)
        if (json.patient !== undefined) this.patient = new Patient().fromJSON(json.patient)
        if (json.nutritional_status !== undefined)
            this.nutritional_status = new NutritionStatus().fromJSON(json.nutritional_status)
        if (json.overweight_indicator !== undefined)
            this.overweight_indicator = new OverweightIndicator().fromJSON(json.overweight_indicator)
        if (json.taylor_cut_point !== undefined) this.taylor_cut_point = new TaylorCutPoint().fromJSON(json.taylor_cut_point)
        if (json.blood_glucose !== undefined) this.blood_glucose = new BloodGlucose().fromJSON(json.blood_glucose)
        if (json.blood_pressure !== undefined) this.blood_pressure = new BloodPressure().fromJSON(json.blood_pressure)
        if (json.counseling !== undefined) this.counseling = new Counseling().fromJSON(json.counseling)
        if (json.physical_activity_habits !== undefined)
            this.physical_activity_habits = new PhysicalActivityHabits().fromJSON(json.physical_activity_habits)
        if (json.feeding_habits_record !== undefined)
            this.feeding_habits_record = new FeedingHabitsRecord().fromJSON(json.feeding_habits_record)
        if (json.medical_record !== undefined) this.medical_record = new MedicalRecord().fromJSON(json.medical_record)
        if (json.sleep_habit !== undefined) this.sleep_habit = new SleepHabit().fromJSON(json.sleep_habit)
        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{
                patient: this.patient ? this.patient.toJSON() : undefined,
                nutritional_status: this.nutritional_status ? this.nutritional_status.toJSON() : undefined,
                overweight_indicator: this.overweight_indicator ? this.overweight_indicator.toJSON() : undefined,
                taylor_cut_point: this.taylor_cut_point ? this.taylor_cut_point.toJSON() : undefined,
                blood_glucose: this.blood_glucose ? this.blood_glucose.toJSON() : undefined,
                blood_pressure: this.blood_pressure ? this.blood_pressure.toJSON() : undefined,
                counseling: this.counseling ? this.counseling.toJSON() : [],
                measurements: this.measurements ? this.measurements.map(item => item.toJSON()) : undefined,
                physical_activity_habits: this.physical_activity_habits ? this.physical_activity_habits.toJSON() : undefined,
                feeding_habits_record: this.feeding_habits_record ? this.feeding_habits_record.toJSON() : undefined,
                medical_record: this.medical_record ? this.medical_record.toJSON() : undefined,
                sleep_habit: this.sleep_habit ? this.sleep_habit.toJSON() : undefined
            }
        }
    }
}
