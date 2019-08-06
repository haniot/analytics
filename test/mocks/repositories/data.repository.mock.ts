import { IDataRepository } from '../../../src/application/port/data.repository.interface'
import { IQuery } from '../../../src/application/port/query.interface'
import { Data } from '../../../src/application/domain/model/data'
import { DefaultEntityMock } from '../models/default.entity.mock'

const data: Data = new Data().fromJSON(DefaultEntityMock.DATA)

export class DataRepositoryMock implements IDataRepository {
    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: Data): Promise<Data> {
        return Promise.resolve(data)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    public find(query: IQuery): Promise<Array<Data>> {
        return Promise.resolve([data])
    }

    public findOne(query: IQuery): Promise<Data> {
        return Promise.resolve(data)
    }

    public update(item: Data): Promise<Data> {
        return Promise.resolve(data)
    }

}
