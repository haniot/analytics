import { OdontologicEvaluationRequest } from '../model/odontologic.evaluation.request'
import { PatientValidator } from './patient.validator'
import { MeasurementsListValidator } from './measurements.list.validator'
import { MeasurementTypes } from '../utils/measurement.types'
import { FeedingHabitsRecordValidator } from './feeding.habits.record.validator'
import { ObjectIdValidator } from './object.id.validator'
import { ValidationException } from '../exception/validation.exception'
import { SleepHabitValidator } from './sleep.habit.validator'
import { SociodemographicRecordValidator } from './sociodemographic.record.validator'
import { FamilyCohesionRecordValidator } from './family.cohesion.record.validator'
import { OralHealthRecordValidator } from './oral.health.record.validator'

export class OdontologicEvaluationRequestValidator {
    public static validate(item: OdontologicEvaluationRequest) {
        const fields: Array<string> = []

        if (!item.patient) fields.push('patient')
        else PatientValidator.validate(item.patient)
        if (!item.measurements || !item.measurements.length) fields.push('measurements')
        else {
            MeasurementsListValidator.validate(item.measurements)
            if (!item.measurements.filter(measurement => measurement.type === MeasurementTypes.BLOOD_GLUCOSE).length) {
                fields.push('measurements.blood_glucose')
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

        if (!item.feeding_habits_record) fields.push('feeding_habits_record')
        else FeedingHabitsRecordValidator.validate(item.feeding_habits_record)
        if (!item.sleep_habit) fields.push('sleep_habit')
        else SleepHabitValidator.validate(item.sleep_habit)
        if (!item.sociodemographic_record) fields.push('sociodemographic_record')
        else SociodemographicRecordValidator.validate(item.sociodemographic_record)
        if (!item.family_cohesion_record) fields.push('family_cohesion_record')
        else FamilyCohesionRecordValidator.validate(item.family_cohesion_record)
        if (!item.oral_health_record) fields.push('oral_health_record')
        else OralHealthRecordValidator.validate(item.oral_health_record)
        if (!item.health_professional_id) fields.push('health_professional_id')
        else ObjectIdValidator.validate(item.health_professional_id)
        if (!item.pilotstudy_id) fields.push('pilotstudy_id')
        else ObjectIdValidator.validate(item.pilotstudy_id)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Odontologic Evaluation Request validation: '
                    .concat(fields.join(', '))
                    .concat(` from patient ${item.patient!.name} evaluation required!`))
        }
    }
}
