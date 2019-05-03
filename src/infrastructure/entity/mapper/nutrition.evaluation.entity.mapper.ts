import { injectable } from 'inversify'
import { IEntityMapper } from '../../port/entity.mapper.interface'
import { NutritionEvaluation } from '../../../application/domain/model/nutrition.evaluation'
import { NutritionEvaluationEntity } from '../nutrition.evaluation.entity'
import { NutritionalStatus } from '../../../application/domain/model/nutritional.status'
import { OverweightIndicator } from '../../../application/domain/model/overweight.indicator'
import { HeartRate } from '../../../application/domain/model/heart.rate'
import { BloodGlucose } from '../../../application/domain/model/blood.glucose'

@injectable()
export class NutritionEvaluationEntityMapper implements IEntityMapper<NutritionEvaluation, NutritionEvaluationEntity> {
    public jsonToModel(json: any): NutritionEvaluation {
        const result: NutritionEvaluation = new NutritionEvaluation()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.status !== undefined) result.status = json.status
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.pilotstudy_id !== undefined) result.pilotstudy_id = json.pilotstudy_id
        if (json.health_professional_id !== undefined) result.health_professional_id = json.health_professional_id
        if (json.nutritional_status !== undefined)
            result.nutritional_status = new NutritionalStatus().fromJSON(json.nutritional_status)
        if (json.overweight_indicator !== undefined)
            result.overweight_indicator = new OverweightIndicator().fromJSON(json.overweight_indicator)
        if (json.heart_rate !== undefined)
            result.heart_rate = new HeartRate().fromJSON(json.heart_rate)
        if (json.blood_glucose !== undefined)
            result.blood_glucose = new BloodGlucose().fromJSON(json.blood_glucose)
        return result
    }

    public modelEntityToModel(item: NutritionEvaluationEntity): NutritionEvaluation {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: NutritionEvaluation): NutritionEvaluationEntity {
        const result: NutritionEvaluationEntity = new NutritionEvaluationEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.status !== undefined) result.status = item.status
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.pilotstudy_id !== undefined) result.pilotstudy_id = item.pilotstudy_id
        if (item.health_professional_id !== undefined) result.health_professional_id = item.health_professional_id
        if (item.nutritional_status !== undefined) result.nutritional_status = item.nutritional_status.toJSON()
        if (item.overweight_indicator !== undefined) result.overweight_indicator = item.overweight_indicator.toJSON()
        if (item.heart_rate !== undefined) result.heart_rate = item.heart_rate.toJSON()
        if (item.blood_glucose !== undefined) result.blood_glucose = item.blood_glucose.toJSON()
        return result
    }

    public transform(item: any): any {
        if (item instanceof NutritionEvaluation) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }
}
