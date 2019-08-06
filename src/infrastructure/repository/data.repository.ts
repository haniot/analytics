import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { Data } from '../../application/domain/model/data'
import { DataEntity } from '../entity/data.entity'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { IDataRepository } from '../../application/port/data.repository.interface'

@injectable()
export class DataRepository extends BaseRepository<Data, DataEntity>
    implements IDataRepository {
    constructor(
        @inject(Identifier.DATA_REPO_MODEL) readonly _model: any,
        @inject(Identifier.DATA_ENTITY_MAPPER)
        readonly _mapper: IEntityMapper<Data, DataEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_model, _mapper, _logger)
    }
}
