import { IRepository } from './repository.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'

export interface INutritionEvaluationRepository extends IRepository<NutritionEvaluation> {
}
