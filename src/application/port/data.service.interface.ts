import { Data } from '../domain/model/data'
import { IService } from './service.interface'
import { DataRequestParameters } from '../domain/model/data.request.parameters'

export interface IDataService extends IService<Data> {
    requestData(pilotId: string, item: DataRequestParameters, token: string): Promise<any>
}
