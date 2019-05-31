import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { OdontologicEvaluation } from '../../application/domain/model/odontologic.evaluation'
import { OdontologicEvaluationEntity } from '../entity/odontologic.evaluation.entity'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { IOdontologicEvaluationRepository } from '../../application/port/odontologic.evaluation.repository.interface'

@injectable()
export class OdontologicEvaluationRepository extends BaseRepository<OdontologicEvaluation, OdontologicEvaluationEntity>
    implements IOdontologicEvaluationRepository {
    constructor(
        @inject(Identifier.ODONTOLOGIC_EVALUATION_REPO_MODEL) readonly _model: any,
        @inject(Identifier.ODONTOLOGIC_EVALUATION_ENTITY_MAPPER)
        readonly _mapper: IEntityMapper<OdontologicEvaluation, OdontologicEvaluationEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_model, _mapper, _logger)
    }
}
