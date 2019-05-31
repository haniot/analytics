import { OdontologicEvaluation } from '../domain/model/odontologic.evaluation'
import { IService } from './service.interface'
import { OdontologicEvaluationRequest } from '../domain/model/odontologic.evaluation.request'

export interface IOdontologicEvaluationService extends IService<OdontologicEvaluation> {
    addEvaluation(item: Array<OdontologicEvaluationRequest>): Promise<OdontologicEvaluation>

    removeEvaluation(pilotId: string, evaluationId: string): Promise<boolean>
}
