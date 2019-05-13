import { ValidationException } from '../exception/validation.exception'
import { MeasurementTypesValidator } from './measurement.types.validator'
import { DatetimeValidator } from './date.time.validator'
import { ObjectIdValidator } from './object.id.validator'
import { FatMeasurementValidator } from './fat.measurement.validator'
import { WeightMeasurement } from '../model/weight.measurement'

export class WeightMeasurementValidator {
    public static validate(item: WeightMeasurement): void | ValidationException {
        const fields: Array<string> = []

        if (!item.value) fields.push('value')
        if (!item.unit) fields.push('unit')
        if (!item.type) fields.push('type')
        else MeasurementTypesValidator.validate(item.type)
        if (!item.timestamp) fields.push('timestamp')
        else DatetimeValidator.validate(item.timestamp)
        if (!item.user_id) fields.push('user_id')
        else ObjectIdValidator.validate(item.user_id)
        if (item.device_id) ObjectIdValidator.validate(item.device_id)
        if (item.fat) FatMeasurementValidator.validate(item.fat)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Weight validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
