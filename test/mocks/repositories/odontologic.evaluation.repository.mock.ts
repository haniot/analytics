import { IDataRepository } from '../../../src/application/port/data.repository.interface'
import { IQuery } from '../../../src/application/port/query.interface'
import { Data } from '../../../src/application/domain/model/data'
import { DefaultEntityMock } from '../models/default.entity.mock'

export class OdontologicEvaluationRepositoryMock implements IDataRepository {

    private evaluation: Data

    constructor() {
        this.evaluation = new Data().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION)
        this.evaluation.id = DefaultEntityMock.ODONTOLOGIC_EVALUATION.id
    }

    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: Data): Promise<Data> {
        return Promise.resolve(item.total_patients === 1 ? this.evaluation : undefined!)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    public find(query: IQuery): Promise<Array<Data>> {
        return Promise.resolve([this.evaluation])
    }

    public findOne(query: IQuery): Promise<Data> {
        return Promise.resolve(this.evaluation)
    }

    public update(item: Data): Promise<Data> {
        return Promise.resolve(this.evaluation)
    }

}
