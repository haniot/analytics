import { NutritionEvaluation } from '../model/nutrition.evaluation'
import { ValidationException } from '../exception/validation.exception'
import { EvaluationStatusTypesValidator } from './evaluation.status.types.validator'
import { NutritionalStatusValidator } from './nutritional.status.validator'
import { OverweightIndicatorValidator } from './overweight.indicator.validator'
import { BloodGlucoseValidator } from './blood.glucose.validator'
import { HeartRateValidator } from './heart.rate.validator'
import { PhysicalActivityHabitsValidator } from './physical.activity.habits.validator'
import { FeedingHabitsRecordValidator } from './feeding.habits.record.validator'
import { MedicalRecordValidator } from './medical.record.validator'
import { BloodPressureValidator } from './blood.pressure.validator'
import { MeasurementsValidator } from './measurements.validator'

export class UpdateNutritionalEvaluationValidator {
    public static validate(item: NutritionEvaluation): void | ValidationException {
        if (item.status) EvaluationStatusTypesValidator.validate(item.status)
        if (item.created_at) throw new ValidationException(
            'This parameter can not be updated!',
            'The date of created can not be updated!')
        if (item.patient_id) throw new ValidationException(
            'This parameter can not be updated!',
            'The id of patient can not be updated!')
        if (item.nutritional_status) NutritionalStatusValidator.validate(item.nutritional_status)
        if (item.overweight_indicator) OverweightIndicatorValidator.validate(item.overweight_indicator)
        if (item.heart_rate) HeartRateValidator.validate(item.heart_rate)
        if (item.blood_glucose) BloodGlucoseValidator.validate(item.blood_glucose)
        if (item.blood_pressure) BloodPressureValidator.validate(item.blood_pressure)
        if (item.measurements) MeasurementsValidator.validate(item.measurements)
        if (item.physical_activity_habits) PhysicalActivityHabitsValidator.validate(item.physical_activity_habits)
        if (item.feeding_habits_record) FeedingHabitsRecordValidator.validate(item.feeding_habits_record)
        if (item.medical_record) MedicalRecordValidator.validate(item.medical_record)

    }
}
