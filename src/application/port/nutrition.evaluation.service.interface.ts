import { IService } from './service.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'
import { NutritionEvaluationRequest } from '../domain/model/nutrition.evaluation.request'
import { NutritionalCouncil } from '../domain/model/nutritional.council'

export interface INutritionEvaluationService extends IService<NutritionEvaluation> {
    addEvaluation(item: NutritionEvaluationRequest): Promise<NutritionEvaluation>
    updateNutritionalCounseling(patientId: string, evaluationId: string, counseling: NutritionalCouncil):
        Promise<NutritionEvaluation>
    removeEvaluation(patientId: string, evaluationId: string): Promise<boolean>
}
