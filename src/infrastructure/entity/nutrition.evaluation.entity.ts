import { EvaluationEntity } from './evaluation.entity'

export class NutritionEvaluationEntity extends EvaluationEntity {
    public nutritional_status?: any
    public overweight_indicator?: any
    public heart_rate?: any
    public blood_glucose?: any
    public blood_pressure?: any
    public counseling?: Array<any>
}
