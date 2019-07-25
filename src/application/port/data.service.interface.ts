import { Data } from '../domain/model/data'
import { IService } from './service.interface'
import { DataRequest } from '../domain/model/data.request'

export interface IDataService extends IService<Data> {
    addEvaluation(item: Array<DataRequest>): Promise<Data>

    removeEvaluation(pilotId: string, evaluationId: string): Promise<boolean>
}
