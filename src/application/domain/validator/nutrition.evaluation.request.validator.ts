import { NutritionEvaluationRequest } from '../model/nutrition.evaluation.request'
import { ValidationException } from '../exception/validation.exception'
import { PatientValidator } from './patient.validator'
import { MeasurementsListValidator } from './measurements.list.validator'
import { PhysicalActivityHabitsValidator } from './physical.activity.habits.validator'
import { FeedingHabitsRecordValidator } from './feeding.habits.record.validator'
import { MedicalRecordValidator } from './medical.record.validator'
import { ObjectIdValidator } from './object.id.validator'
import { MeasurementTypes } from '../utils/measurement.types'

export class NutritionEvaluationRequestValidator {
    public static validate(item: NutritionEvaluationRequest): void | ValidationException {
        const fields: Array<string> = []

        if (!item.patient) fields.push('patient')
        else {
            if (!item.patient.id) fields.push('patient.id')
            else ObjectIdValidator.validate(item.patient.id)
            PatientValidator.validate(item.patient)
        }
        if (!item.measurements || !item.measurements.length) fields.push('measurements')
        else {
            MeasurementsListValidator.validate(item.measurements)
            if (!item.measurements.filter(measurement => measurement.type === MeasurementTypes.BLOOD_GLUCOSE).length) {
                fields.push('measurements.blood_glucose')
            }
            if (!item.measurements.filter(measurement => measurement.type === MeasurementTypes.BLOOD_PRESSURE).length) {
                fields.push('measurements.blood_pressure')
            }
            if (!item.measurements.filter(measurement => measurement.type === MeasurementTypes.HEIGHT).length) {
                fields.push('measurements.height')
            }
            if (!item.measurements.filter(measurement => measurement.type === MeasurementTypes.WEIGHT).length) {
                fields.push('measurements.weight')
            }
            if (!item.measurements.filter(measurement => measurement.type === MeasurementTypes.WAIST_CIRCUMFERENCE).length) {
                fields.push('measurements.waist_circumference')
            }
        }
        if (!item.physical_activity_habits) fields.push('physical_activity_habits')
        else PhysicalActivityHabitsValidator.validate(item.physical_activity_habits)
        if (!item.feeding_habits_record) fields.push('feeding_habits_record')
        else FeedingHabitsRecordValidator.validate(item.feeding_habits_record)
        if (!item.medical_record) fields.push('medical_record')
        else MedicalRecordValidator.validate(item.medical_record)
        if (!item.health_professional_id) fields.push('health_professional_id')
        else ObjectIdValidator.validate(item.health_professional_id)
        if (!item.pilotstudy_id) fields.push('pilotstudy_id')
        else ObjectIdValidator.validate(item.pilotstudy_id)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Nutrition Evaluation Request validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
