import { inject, injectable } from 'inversify'
import { INutritionEvaluationService } from '../port/nutrition.evaluation.service.interface'
import { IQuery } from '../port/query.interface'
import { NutritionEvaluation } from '../domain/model/nutrition.evaluation'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationRepository } from '../port/nutrition.evaluation.repository.interface'
import { EvaluationTypes } from '../domain/utils/evaluation.types'
import { EvaluationRequest } from '../domain/model/evaluation.request'
import { EvaluationUtils } from '../domain/utils/evaluation.utils'
import { EvaluationRequestValidator } from '../domain/validator/evaluation.request.validator'
import { UpdateNutritionalEvaluationValidator } from '../domain/validator/update.nutritional.evaluation.validator'
import { CreateNutritionalEvaluationValidator } from '../domain/validator/create.nutritional.evaluation.validator'

@injectable()
export class NutritionEvaluationService implements INutritionEvaluationService {
    private _nutritionEvaluationUtils: EvaluationUtils

    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_REPOSITORY) private readonly _repo: INutritionEvaluationRepository
    ) {
        this._nutritionEvaluationUtils = new EvaluationUtils()
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
        try {
            UpdateNutritionalEvaluationValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async addEvaluation(item: EvaluationRequest): Promise<NutritionEvaluation> {
        try {
            EvaluationRequestValidator.validate(item)
            const evaluation: NutritionEvaluation = await this._nutritionEvaluationUtils.generateEvaluation(item)
            CreateNutritionalEvaluationValidator.validate(evaluation)
            return this._repo.create(evaluation)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
