import { IOdontologicEvaluationRepository } from '../../../src/application/port/odontologic.evaluation.repository.interface'
import { IQuery } from '../../../src/application/port/query.interface'
import { OdontologicEvaluation } from '../../../src/application/domain/model/odontologic.evaluation'
import { DefaultEntityMock } from '../models/default.entity.mock'

export class OdontologicEvaluationRepositoryMock implements IOdontologicEvaluationRepository {

    private evaluation: OdontologicEvaluation

    constructor() {
        this.evaluation = new OdontologicEvaluation().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION)
        this.evaluation.id = DefaultEntityMock.ODONTOLOGIC_EVALUATION.id
    }

    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: OdontologicEvaluation): Promise<OdontologicEvaluation> {
        return Promise.resolve(this.evaluation)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    public find(query: IQuery): Promise<Array<OdontologicEvaluation>> {
        return Promise.resolve([this.evaluation])
    }

    public findOne(query: IQuery): Promise<OdontologicEvaluation> {
        return Promise.resolve(this.evaluation)
    }

    public update(item: OdontologicEvaluation): Promise<OdontologicEvaluation> {
        return Promise.resolve(this.evaluation)
    }

}
