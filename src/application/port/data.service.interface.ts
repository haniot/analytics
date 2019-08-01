import { Data } from '../domain/model/data'
import { IService } from './service.interface'
import { DataRequest } from '../domain/model/data.request'

export interface IDataService extends IService<Data> {

    requestData(pilotId: string, item: DataRequest): Promise<any>

    removeEvaluation(pilotId: string, evaluationId: string): Promise<boolean>
}
