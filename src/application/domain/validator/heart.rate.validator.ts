import { ValidationException } from '../exception/validation.exception'
import { DatetimeValidator } from './date.time.validator'

export class HeartRateValidator {
    public static validate(item: any): void | ValidationException {
        const fields: Array<string> = []

        if (!item.min) fields.push('heart_rate.min')
        if (!item.max) fields.push('heart_rate.max')
        if (!item.average) fields.push('heart_rate.average')
        if (!item.dataset || !item.dataset.length) fields.push('dataset')
        else item.dataset.forEach(value => {
            if (!value.value) fields.push('heart_rate.dataset.item.value')
            else if (!value.timestamp) fields.push('heart_rate.dataset.item.timestamp')
            else DatetimeValidator.validate(value.timestamp)
        })

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Heart Rate validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
