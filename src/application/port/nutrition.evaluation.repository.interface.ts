import { IRepository } from './repository.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'
import { NutritionCouncil } from '../domain/model/nutrition.council'

export interface INutritionEvaluationRepository extends IRepository<NutritionEvaluation> {
    updateNutritionalCounseling(patientId: string, evaluationId: string, counseling: NutritionCouncil): Promise<NutritionEvaluation>
}
