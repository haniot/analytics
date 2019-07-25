import { IRepository } from './repository.interface'
import { Data } from '../domain/model/data'

export interface IDataRepository extends IRepository<Data> {
}
