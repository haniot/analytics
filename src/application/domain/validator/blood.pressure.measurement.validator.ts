import { ValidationException } from '../exception/validation.exception'
import { ObjectIdValidator } from './object.id.validator'
import { DatetimeValidator } from './date.time.validator'
import { MeasurementTypesValidator } from './measurement.types.validator'
import { BloodPressureMeasurement } from '../model/blood.pressure.measurement'

export class BloodPressureMeasurementValidator {
    public static validate(item: BloodPressureMeasurement): void | ValidationException {
        const fields: Array<string> = []

        if (!item.systolic) fields.push('systolic')
        if (!item.diastolic) fields.push('diastolic')
        if (!item.unit) fields.push('unit')
        if (!item.type) fields.push('type')
        else MeasurementTypesValidator.validate(item.type)
        if (!item.timestamp) fields.push('timestamp')
        else DatetimeValidator.validate(item.timestamp)
        if (item.device_id) ObjectIdValidator.validate(item.device_id)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Blood Pressure Measurement validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
