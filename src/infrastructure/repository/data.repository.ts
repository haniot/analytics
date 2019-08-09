import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { Data } from '../../application/domain/model/data'
import { DataEntity } from '../entity/data.entity'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { IDataRepository } from '../../application/port/data.repository.interface'
import { DataRequestParameters } from '../../application/domain/model/data.request.parameters'
import { IEventBus } from '../port/event.bus.interface'

@injectable()
export class DataRepository extends BaseRepository<Data, DataEntity> implements IDataRepository {
    constructor(
        @inject(Identifier.DATA_REPO_MODEL) readonly _model: any,
        @inject(Identifier.DATA_ENTITY_MAPPER) readonly _mapper: IEntityMapper<Data, DataEntity>,
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_model, _mapper, _logger)
    }

    public generateData(pilotId: string, dataRequest: DataRequestParameters): Promise<Data> {
        return new Promise<Data>(async (resolve, reject) => {
            // Solicitar ao account os usuários do piloto
            this._eventBus.executeResource('account.rpc', 'pilotstudies.findone', '?')
                .then(result => {
                    console.log('the result of search is', result)
                    return resolve(new Data())
                })
                .catch(err => reject(this.mongoDBErrorListener(err)))
            // Se houver sucesso, solicitar ao mhealth as medições de cada paciente E
            // solicitar no EHR os questionários de nutrição e odontológicos
            // Se houver sucesso, montar o arquivo .xls e .csv, enviar para a AWS, salvar as referências no banco
        })
    }
}
