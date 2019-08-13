import { inject, injectable } from 'inversify'
import { INutritionEvaluationRepository } from '../../application/port/nutrition.evaluation.repository.interface'
import { NutritionEvaluation } from '../../application/domain/model/nutrition.evaluation'
import { NutritionEvaluationEntity } from '../entity/nutrition.evaluation.entity'
import { BaseRepository } from './base/base.repository'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { NutritionCouncil } from '../../application/domain/model/nutrition.council'
import { NutritionEvaluationStatusTypes } from '../../application/domain/utils/nutrition.evaluation.status.types'

@injectable()
export class NutritionEvaluationRepository extends BaseRepository<NutritionEvaluation, NutritionEvaluationEntity>
    implements INutritionEvaluationRepository {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_REPO_MODEL) readonly _model: any,
        @inject(Identifier.NUTRITION_EVALUATION_ENTITY_MAPPER)
        readonly _mapper: IEntityMapper<NutritionEvaluation, NutritionEvaluationEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_model, _mapper, _logger)
    }

    public updateNutritionalCounseling(patientId: string, evaluationId: string, counseling: NutritionCouncil):
        Promise<NutritionEvaluation> {
        return new Promise<NutritionEvaluation>((resolve, reject) => {
            return this.Model.findOneAndUpdate(
                { _id: evaluationId },
                {
                    $set: {
                        'counseling.definitive': counseling.toJSON(),
                        'status': NutritionEvaluationStatusTypes.COMPLETE
                    }
                },
                { new: true })
                .then(result => {
                    if (!result) return resolve(undefined)
                    return resolve(this._mapper.transform(result))
                })
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    public removeNutritionaLEvaluationFromPatient(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Model.deleteMany({ 'patient.id': id })
                .then((result) => resolve(!!result))
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }
}
