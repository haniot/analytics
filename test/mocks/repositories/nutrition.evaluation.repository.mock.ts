import { INutritionEvaluationRepository } from '../../../src/application/port/nutrition.evaluation.repository.interface'
import { IQuery } from '../../../src/application/port/query.interface'
import { NutritionEvaluation } from '../../../src/application/domain/model/nutrition.evaluation'
import { DefaultEntityMock } from '../models/default.entity.mock'
import { NutritionCouncil } from '../../../src/application/domain/model/nutrition.council'

const evaluation: NutritionEvaluation = new NutritionEvaluation().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION)
evaluation.id = DefaultEntityMock.NUTRITION_EVALUATION.id

export class NutritionEvaluationRepositoryMock implements INutritionEvaluationRepository {

    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: NutritionEvaluation): Promise<NutritionEvaluation> {
        return Promise.resolve(evaluation)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    public find(query: IQuery): Promise<Array<NutritionEvaluation>> {
        return Promise.resolve([evaluation])
    }

    public findOne(query: IQuery): Promise<NutritionEvaluation> {
        return Promise.resolve(evaluation)
    }

    public update(item: NutritionEvaluation): Promise<NutritionEvaluation> {
        return Promise.resolve(evaluation)
    }

    public updateNutritionalCounseling(patientId: string, evaluationId: string, counseling: NutritionCouncil):
        Promise<NutritionEvaluation> {
        return Promise.resolve(evaluation)
    }

}
