import { inject, injectable } from 'inversify'
import { IDataService } from '../port/data.service.interface'
import { IQuery } from '../port/query.interface'
import { Data } from '../domain/model/data'
import { Identifier } from '../../di/identifiers'
import { IDataRepository } from '../port/data.repository.interface'
import { IEvaluationFilesManagerRepository } from '../port/evaluation.files.manager.repository.interface'
import { EvaluationFile } from '../domain/model/evaluation.file'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { CreateDataValidator } from '../domain/validator/create.data.validator'
import { ILogger } from '../../utils/custom.logger'
import { ValidationException } from '../domain/exception/validation.exception'
import { DataRequestParameters } from '../domain/model/data.request.parameters'

@injectable()
export class DataService implements IDataService {
    constructor(
        @inject(Identifier.DATA_REPOSITORY) readonly _dataRepo: IDataRepository,
        @inject(Identifier.AWS_FILES_REPOSITORY) readonly _awsFilesRepo: IEvaluationFilesManagerRepository<EvaluationFile>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
    }

    public add(item: Data): Promise<Data> {
        try {
            CreateDataValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._dataRepo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<Data>> {
        try {
            const pilotId = query.toJSON().filters.pilotstudy_id
            if (pilotId) ObjectIdValidator.validate(pilotId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._dataRepo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<Data> {
        throw Error('Not implemented!')
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented!')
    }

    public update(item: Data): Promise<Data> {
        throw Error('Not implemented!')
    }

    public count(query: IQuery): Promise<number> {
        return this._dataRepo.count(query)
    }

    public requestData(pilotId: string, item: DataRequestParameters, token: string): Promise<any> {
        try {
            ObjectIdValidator.validate(pilotId)
            if (!item.data_types || !item.data_types.length) {
                throw new ValidationException('You must select at least one data type to request data from a pilot study.')
            }
            this._dataRepo.generateData(pilotId, item, token)
        } catch (err) {
            return Promise.reject(err)
        }
        const estimate = new Date()
        estimate.setMinutes(estimate.getMinutes() + 5) // Five minutes estimated to generate data.
        return Promise.resolve({ status: 'pending', completion_estimate: estimate })
    }
}
