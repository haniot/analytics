import { IService } from './service.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'
import { EvaluationRequest } from '../domain/model/evaluation.request'

export interface INutritionEvaluationService extends IService<NutritionEvaluation> {
    addEvaluation(item: EvaluationRequest): Promise<NutritionEvaluation>
}
