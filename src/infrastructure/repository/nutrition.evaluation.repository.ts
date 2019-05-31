import { inject, injectable } from 'inversify'
import { INutritionEvaluationRepository } from '../../application/port/nutrition.evaluation.repository.interface'
import { NutritionEvaluation } from '../../application/domain/model/nutrition.evaluation'
import { NutritionEvaluationEntity } from '../entity/nutrition.evaluation.entity'
import { BaseRepository } from './base/base.repository'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'

@injectable()
export class NutritionEvaluationRepository extends BaseRepository<NutritionEvaluation, NutritionEvaluationEntity>
    implements INutritionEvaluationRepository {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_REPO_MODEL) readonly _model: any,
        @inject(Identifier.NUTRITION_EVALUATION_ENTITY_MAPPER)
        readonly _mapper: IEntityMapper<NutritionEvaluation, NutritionEvaluationEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_model, _mapper, _logger)
    }
}
