import { IService } from './service.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'
import { EvaluationRequest } from '../domain/model/evaluation.request'
import { NutritionalCouncil } from '../domain/model/nutritional.council'

export interface INutritionEvaluationService extends IService<NutritionEvaluation> {
    addEvaluation(item: EvaluationRequest): Promise<NutritionEvaluation>
    updateNutritionalCounseling(patientId: string, evaluationId: string, counseling: NutritionalCouncil):
        Promise<NutritionEvaluation>
}
