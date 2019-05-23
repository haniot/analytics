import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IOdontologicEvaluationService } from '../port/odontologic.evaluation.service.interface'
import { IOdontologicEvaluationRepository } from '../port/odontologic.evaluation.repository.interface'
import { IQuery } from '../port/query.interface'
import { OdontologicEvaluation } from '../domain/model/odontologic.evaluation'

@injectable()
export class OdontologicEvaluationService implements IOdontologicEvaluationService {
    constructor(
        @inject(Identifier.ODONTOLOGIC_EVALUATION_REPOSITORY) private readonly _repo: IOdontologicEvaluationRepository
    ) {
    }

    public add(item: OdontologicEvaluation): Promise<OdontologicEvaluation> {
        this._repo
        throw Error('Not implemented!')
    }

    public getAll(query: IQuery): Promise<Array<OdontologicEvaluation>> {
        throw Error('Not implemented!')
    }

    public getById(id: string, query: IQuery): Promise<OdontologicEvaluation> {
        throw Error('Not implemented!')
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented!')
    }

    public update(item: OdontologicEvaluation): Promise<OdontologicEvaluation> {
        throw Error('Not implemented!')
    }

    // private async generateEvaluation(item: OdontologicEvaluationRequest): Promise<OdontologicEvaluation> {
    //     const result: OdontologicEvaluation = new OdontologicEvaluation()
    //     return Promise.resolve(result)
    // }
    //
    // private async getEvaluationData(request: OdontologicEvaluationRequest): any {
    //     const patient: any = request.patient!.toJSON()
    //     const height = request.measurements!
    //         .filter(item => item.type === MeasurementTypes.HEIGHT)[0].toJSON()
    //     const weight = request.measurements!
    //         .filter(item => item.type === MeasurementTypes.WEIGHT)[0].toJSON()
    //     const blood_glucose = request.measurements!
    //         .filter(item => item.type === MeasurementTypes.BLOOD_GLUCOSE)[0].toJSON()
    //     const waist_circumference = request.measurements!
    //         .filter(item => item.type === MeasurementTypes.WAIST_CIRCUMFERENCE)[0].toJSON()
    // }
}
