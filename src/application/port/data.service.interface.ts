import { Data } from '../domain/model/data'
import { IService } from './service.interface'
import { DataRequestParameters } from '../domain/model/data.request.parameters'
import { DataRequest } from '../domain/model/data.request'

export interface IDataService extends IService<Data> {

    requestData(pilotId: string, item: DataRequest): Promise<any>

    addEvaluation(item: Array<DataRequestParameters>): Promise<Data>

    removeEvaluation(pilotId: string, evaluationId: string): Promise<boolean>
}
