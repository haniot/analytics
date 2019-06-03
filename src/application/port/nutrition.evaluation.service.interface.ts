import { IService } from './service.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'
import { NutritionEvaluationRequest } from '../domain/model/nutrition.evaluation.request'
import { NutritionCouncil } from '../domain/model/nutrition.council'

export interface INutritionEvaluationService extends IService<NutritionEvaluation> {
    addEvaluation(item: NutritionEvaluationRequest): Promise<NutritionEvaluation>
    updateNutritionalCounseling(patientId: string, evaluationId: string, counseling: NutritionCouncil):
        Promise<NutritionEvaluation>
    removeEvaluation(patientId: string, evaluationId: string): Promise<boolean>
}
