import { NutritionEvaluation } from '../model/nutrition.evaluation'
import { ValidationException } from '../exception/validation.exception'
import { EvaluationStatusTypesValidator } from './evaluation.status.types.validator'
import { NutritionStatusValidator } from './nutrition.status.validator'
import { OverweightIndicatorValidator } from './overweight.indicator.validator'
import { BloodGlucoseValidator } from './blood.glucose.validator'
import { BloodPressureValidator } from './blood.pressure.validator'
import { MeasurementsValidator } from './measurements.validator'
import { PhysicalActivityHabitsValidator } from './physical.activity.habits.validator'
import { FeedingHabitsRecordValidator } from './feeding.habits.record.validator'
import { MedicalRecordValidator } from './medical.record.validator'
import { SleepHabitValidator } from './sleep.habit.validator'
import { PatientValidator } from './patient.validator'

export class CreateNutritionEvaluationValidator {
    public static validate(item: NutritionEvaluation): void | ValidationException {
        const fields: Array<string> = []

        if (!item.status) fields.push('status')
        else EvaluationStatusTypesValidator.validate(item.status)
        if (!item.patient) fields.push('patient')
        else PatientValidator.validate(item.patient)
        if (!item.nutritional_status) fields.push('nutritional_status')
        else NutritionStatusValidator.validate(item.nutritional_status)
        if (!item.overweight_indicator) fields.push('overweight_indicator')
        else OverweightIndicatorValidator.validate(item.overweight_indicator)
        if (!item.blood_glucose) fields.push('blood_glucose')
        else BloodGlucoseValidator.validate(item.blood_glucose)
        if (!item.blood_pressure) fields.push('blood_pressure')
        else BloodPressureValidator.validate(item.blood_pressure)
        if (!item.measurements || !item.measurements.length) fields.push('measurements')
        else MeasurementsValidator.validate(item.measurements)
        if (!item.physical_activity_habits) fields.push('physical_activity_habits')
        else PhysicalActivityHabitsValidator.validate(item.physical_activity_habits)
        if (!item.feeding_habits_record) fields.push('feeding_habits_record')
        else FeedingHabitsRecordValidator.validate(item.feeding_habits_record)
        if (!item.medical_record) fields.push('medical_record')
        else MedicalRecordValidator.validate(item.medical_record)
        if (!item.sleep_habit) fields.push('sleep_habit')
        else SleepHabitValidator.validate(item.sleep_habit)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Nutritional Evaluation validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
