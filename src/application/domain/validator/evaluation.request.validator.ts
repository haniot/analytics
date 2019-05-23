import { ValidationException } from '../exception/validation.exception'
import { PatientValidator } from './patient.validator'
import { PhysicalActivityHabitsValidator } from './physical.activity.habits.validator'
import { FeedingHabitsRecordValidator } from './feeding.habits.record.validator'
import { MedicalRecordValidator } from './medical.record.validator'
import { ObjectIdValidator } from './object.id.validator'
import { NutritionEvaluationRequest } from '../model/nutrition.evaluation.request'
import { MeasurementTypes } from '../utils/measurement.types'
import { BloodGlucoseMeasurementValidator } from './blood.glucose.measurement.validator'
import { BloodPressureMeasurementValidator } from './blood.pressure.measurement.validator'
import { BodyTemperatureMeasurementValidator } from './body.temperature.measurement.validator'
import { HeartRateMeasurementValidator } from './heart.rate.measurement.validator'
import { HeightMeasurementValidator } from './height.measurement.validator'
import { WaistCircumferenceMeasurementValidator } from './waist.circumference.measurement.validator'
import { FatMeasurementValidator } from './fat.measurement.validator'
import { Strings } from '../../../utils/strings'
import { WeightMeasurementValidator } from './weight.measurement.validator'

export class EvaluationRequestValidator {
    public static validate(item: NutritionEvaluationRequest): void | ValidationException {
        if (item.patient) PatientValidator.validate(item.patient)
        if (item.physical_activity_habits) PhysicalActivityHabitsValidator.validate(item.physical_activity_habits)
        if (item.feeding_habits_record) FeedingHabitsRecordValidator.validate(item.feeding_habits_record)
        if (item.medical_record) MedicalRecordValidator.validate(item.medical_record)
        if (item.health_professional_id) ObjectIdValidator.validate(item.health_professional_id)
        if (item.pilotstudy_id) ObjectIdValidator.validate(item.pilotstudy_id)
        if (item.measurements && item.measurements.length) {
            item.measurements.forEach(measurement => {
                switch (measurement.type) {
                    case(MeasurementTypes.BLOOD_GLUCOSE):
                        BloodGlucoseMeasurementValidator.validate(measurement)
                        break
                    case(MeasurementTypes.BLOOD_PRESSURE):
                        BloodPressureMeasurementValidator.validate(measurement)
                        break
                    case(MeasurementTypes.BODY_TEMPERATURE):
                        BodyTemperatureMeasurementValidator.validate(measurement)
                        break
                    case(MeasurementTypes.HEART_RATE):
                        HeartRateMeasurementValidator.validate(measurement)
                        break
                    case(MeasurementTypes.HEIGHT):
                        HeightMeasurementValidator.validate(measurement)
                        break
                    case(MeasurementTypes.WAIST_CIRCUMFERENCE):
                        WaistCircumferenceMeasurementValidator.validate(measurement)
                        break
                    case(MeasurementTypes.WEIGHT):
                        WeightMeasurementValidator.validate(measurement)
                        break
                    case(MeasurementTypes.FAT):
                        FatMeasurementValidator.validate(measurement)
                        break
                    default:
                        throw new ValidationException(
                            Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`type: ${measurement.type}`),
                            Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                                .concat(Object.values(MeasurementTypes).join(', ').concat('.')))
                }
            })
        }
    }
}
