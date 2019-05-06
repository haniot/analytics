import { inject, injectable } from 'inversify'
import { INutritionEvaluationService } from '../port/nutrition.evaluation.service.interface'
import { IQuery } from '../port/query.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationRepository } from '../port/nutrition.evaluation.repository.interface'
import { EvaluationTypes } from '../domain/utils/evaluation.types'
import { EvaluationRequest } from '../domain/model/evaluation.request'
import { NutritionEvaluationUtils } from '../domain/utils/nutrition.evaluation.utils'

@injectable()
export class NutritionEvaluationService implements INutritionEvaluationService {
    private _nutritionEvaluationUtils: NutritionEvaluationUtils

    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_REPOSITORY) private readonly _repo: INutritionEvaluationRepository
    ) {
        this._nutritionEvaluationUtils = new NutritionEvaluationUtils()
    }

    public add(item: any): Promise<NutritionEvaluation> {
        throw Error('Not implemented!')
    }

    public getAll(query: IQuery): Promise<Array<NutritionEvaluation>> {
        query.addFilter({ type: EvaluationTypes.NUTRITION })
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<NutritionEvaluation> {
        query.addFilter({ _id: id, type: EvaluationTypes.NUTRITION })
        return this._repo.findOne(query)
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented!')
    }

    public update(item: NutritionEvaluation): Promise<NutritionEvaluation> {
        return this._repo.update(item)
    }

    public async addEvaluation(item: EvaluationRequest): Promise<NutritionEvaluation> {
        const evaluation: NutritionEvaluation = await this._nutritionEvaluationUtils.generateEvaluation(item)
        return this._repo.create(evaluation)
    }

}
