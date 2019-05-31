import { ValidationException } from '../exception/validation.exception'
import { MeasurementTypesValidator } from './measurement.types.validator'
import { ObjectIdValidator } from './object.id.validator'
import { MealTypesValidator } from './meal.types.validator'
import { DatetimeValidator } from './date.time.validator'
import { BloodGlucoseMeasurement } from '../model/blood.glucose.measurement'

export class BloodGlucoseMeasurementValidator {
    public static validate(item: BloodGlucoseMeasurement): void | ValidationException {
        const fields: Array<string> = []

        if (!item.value) fields.push('value')
        if (!item.unit) fields.push('unit')
        if (!item.meal) fields.push('meal')
        else MealTypesValidator.validate(item.meal)
        if (!item.type) fields.push('type')
        else MeasurementTypesValidator.validate(item.type)
        if (!item.timestamp) fields.push('timestamp')
        else DatetimeValidator.validate(item.timestamp)
        if (item.device_id) ObjectIdValidator.validate(item.device_id)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Blood Glucose Measurement validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
