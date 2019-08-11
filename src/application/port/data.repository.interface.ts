import { IRepository } from './repository.interface'
import { Data } from '../domain/model/data'
import { DataRequestParameters } from '../domain/model/data.request.parameters'

export interface IDataRepository extends IRepository<Data> {
    removeDataFromPilotStudy(id: string): Promise<boolean>

    generateData(pilotId: string, dataRequest: DataRequestParameters, token: string): Promise<void>
}
