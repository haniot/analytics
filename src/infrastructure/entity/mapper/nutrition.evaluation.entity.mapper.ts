import { injectable } from 'inversify'
import { IEntityMapper } from '../../port/entity.mapper.interface'
import { NutritionEvaluation } from '../../../application/domain/model/nutrition.evaluation'
import { NutritionEvaluationEntity } from '../nutrition.evaluation.entity'
import { NutritionalStatus } from '../../../application/domain/model/nutritional.status'
import { OverweightIndicator } from '../../../application/domain/model/overweight.indicator'
import { HeartRate } from '../../../application/domain/model/heart.rate'
import { BloodGlucose } from '../../../application/domain/model/blood.glucose'
import { BloodPressure } from '../../../application/domain/model/blood.pressure'
import { Counseling } from '../../../application/domain/model/counseling'
import { MeasurementTypes } from '../../../application/domain/utils/measurement.types'
import { HeightMeasurement } from '../../../application/domain/model/height.measurement'
import { HeartRateMeasurement } from '../../../application/domain/model/heart.rate.measurement'
import { BloodPressureMeasurement } from '../../../application/domain/model/blood.pressure.measurement'
import { WeightMeasurement } from '../../../application/domain/model/weight.measurement'
import { BloodGlucoseMeasurement } from '../../../application/domain/model/blood.glucose.measurement'
import { BodyTemperatureMeasurement } from '../../../application/domain/model/body.temperature.measurement'
import { WaistCircumferenceMeasurement } from '../../../application/domain/model/waist.circumference.measurement'
import { FatMeasurement } from '../../../application/domain/model/fat.measurement'
import { PhysicalActivityHabits } from '../../../application/domain/model/physical.activity.habits'
import { FeedingHabitsRecord } from '../../../application/domain/model/feeding.habits.record'
import { MedicalRecord } from '../../../application/domain/model/medical.record'
import { SleepHabit } from '../../../application/domain/model/sleep.habit'
import { Patient } from '../../../application/domain/model/patient'

@injectable()
export class NutritionEvaluationEntityMapper implements IEntityMapper<NutritionEvaluation, NutritionEvaluationEntity> {
    public jsonToModel(json: any): NutritionEvaluation {
        const result: NutritionEvaluation = new NutritionEvaluation()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.status !== undefined) result.status = json.status
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.patient !== undefined) result.patient = new Patient().fromJSON(json.patient)
        if (json.pilotstudy_id !== undefined) result.pilotstudy_id = json.pilotstudy_id
        if (json.health_professional_id !== undefined) result.health_professional_id = json.health_professional_id
        if (json.nutritional_status !== undefined)
            result.nutritional_status = new NutritionalStatus().fromJSON(json.nutritional_status)
        if (json.overweight_indicator !== undefined)
            result.overweight_indicator = new OverweightIndicator().fromJSON(json.overweight_indicator)
        if (json.heart_rate !== undefined) result.heart_rate = new HeartRate().fromJSON(json.heart_rate)
        if (json.blood_glucose !== undefined) result.blood_glucose = new BloodGlucose().fromJSON(json.blood_glucose)
        if (json.blood_pressure !== undefined) result.blood_pressure = new BloodPressure().fromJSON(json.blood_pressure)
        if (json.counseling !== undefined) result.counseling = new Counseling().fromJSON(json.counseling)
        if (json.measurements !== undefined && json.measurements.length)
            result.measurements = json.measurements.map(measurement => this.measurementJsonToModel(measurement))
        if (json.physical_activity_habits !== undefined)
            result.physical_activity_habits = new PhysicalActivityHabits().fromJSON(json.physical_activity_habits)
        if (json.feeding_habits_record !== undefined)
            result.feeding_habits_record = new FeedingHabitsRecord().fromJSON(json.feeding_habits_record)
        if (json.medical_record !== undefined) result.medical_record = new MedicalRecord().fromJSON(json.medical_record)
        if (json.sleep_habit !== undefined) result.sleep_habit = new SleepHabit().fromJSON(json.sleep_habit)
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
        if (item.type !== undefined) result.type = item.type
        if (item.patient !== undefined) result.patient = item.patient.toJSON()
        if (item.pilotstudy_id !== undefined) result.pilotstudy_id = item.pilotstudy_id
        if (item.health_professional_id !== undefined) result.health_professional_id = item.health_professional_id
        if (item.nutritional_status !== undefined) result.nutritional_status = item.nutritional_status.toJSON()
        if (item.overweight_indicator !== undefined) result.overweight_indicator = item.overweight_indicator.toJSON()
        if (item.heart_rate !== undefined) result.heart_rate = item.heart_rate.toJSON()
        if (item.blood_glucose !== undefined) result.blood_glucose = item.blood_glucose.toJSON()
        if (item.blood_pressure !== undefined) result.blood_pressure = item.blood_pressure.toJSON()
        if (item.counseling !== undefined) result.counseling = item.counseling.toJSON()
        if (item.measurements !== undefined && item.measurements.length)
            result.measurements = item.measurements.map(measurement => measurement.toJSON())
        if (item.physical_activity_habits !== undefined) result.physical_activity_habits = item.physical_activity_habits.toJSON()
        if (item.feeding_habits_record !== undefined) result.feeding_habits_record = item.feeding_habits_record.toJSON()
        if (item.medical_record !== undefined) result.medical_record = item.medical_record.toJSON()
        if (item.sleep_habit !== undefined) result.sleep_habit = item.sleep_habit.toJSON()
        return result
    }

    public transform(item: any): any {
        if (item instanceof NutritionEvaluation) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }

    private measurementJsonToModel(item: any): any {
        if (item.type) {
            switch (item.type) {
                case MeasurementTypes.HEIGHT:
                    return new HeightMeasurement().fromJSON(item)
                case MeasurementTypes.HEART_RATE:
                    return new HeartRateMeasurement().fromJSON(item)
                case MeasurementTypes.BLOOD_PRESSURE:
                    return new BloodPressureMeasurement().fromJSON(item)
                case MeasurementTypes.WEIGHT:
                    if (item.fat !== undefined) {
                        item.fat = {
                            ...item.fat,
                            ...{
                                device_id: item.device_id,
                                timestamp: item.timestamp,
                                user_id: item.user_id
                            }
                        }
                    }
                    return new WeightMeasurement().fromJSON(item)
                case MeasurementTypes.BLOOD_GLUCOSE:
                    return new BloodGlucoseMeasurement().fromJSON(item)
                case MeasurementTypes.BODY_TEMPERATURE:
                    return new BodyTemperatureMeasurement().fromJSON(item)
                case MeasurementTypes.WAIST_CIRCUMFERENCE:
                    return new WaistCircumferenceMeasurement().fromJSON(item)
                case MeasurementTypes.FAT:
                    return new FatMeasurement().fromJSON(item)
                default:
                    return item
            }
        }
        return undefined
    }
}
