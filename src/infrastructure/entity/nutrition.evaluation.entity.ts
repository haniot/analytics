import { EvaluationEntity } from './evaluation.entity'

export class NutritionEvaluationEntity extends EvaluationEntity {
    public nutritional_status?: any
    public overweight_indicator?: any
    public heart_rate?: any
    public blood_glucose?: any
    public blood_pressure?: any
    public counseling?: any
    public measurements?: Array<any>
    public physical_activity_habits?: any
    public feeding_habits_record?: any
    public medical_record?: any
    public sleep_habit?: any
}
