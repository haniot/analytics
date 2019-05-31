import { ValidationException } from '../exception/validation.exception'
import { MeasurementTypesValidator } from './measurement.types.validator'
import { ObjectIdValidator } from './object.id.validator'
import { DatetimeValidator } from './date.time.validator'
import { HeartRateMeasurement } from '../model/heart.rate.measurement'

export class HeartRateMeasurementValidator {
    public static validate(item: HeartRateMeasurement): void | ValidationException {
        const fields: Array<string> = []

        if (!item.dataset || !item.dataset.length) fields.push('dataset')
        else item.dataset.forEach(value => {
            if (!value.value) fields.push('dataset.item.value')
            if (!value.timestamp) fields.push('dataset.item.timestamp')
            else DatetimeValidator.validate(value.timestamp)
        })
        if (!item.unit) fields.push('unit')
        if (!item.type) fields.push('type')
        else MeasurementTypesValidator.validate(item.type)
        if (item.device_id) ObjectIdValidator.validate(item.device_id)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Heart Rate Measurement validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
