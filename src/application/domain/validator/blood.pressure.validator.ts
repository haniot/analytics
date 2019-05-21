import { ValidationException } from '../exception/validation.exception'
import { BloodPressure } from '../model/blood.pressure'
import { BloodPressureSystolicPercentileTypesValidator } from './blood.pressure.systolic.percentile.types.validator'
import { BloodPressureDiastolicPercentileTypesValidator } from './blood.pressure.diastolic.percentile.types.validator'
import { BloodPressurePercentileClassificationTypesValidator } from './blood.pressure.percentile.classification.types.validator'

export class BloodPressureValidator {
    public static validate(item: BloodPressure): void | ValidationException {
        const fields: Array<string> = []

        if (!item.systolic) fields.push('systolic')
        if (!item.diastolic) fields.push('diastolic')
        if (!item.systolic_percentile) fields.push('systolic_percentile')
        else BloodPressureSystolicPercentileTypesValidator.validate(item.systolic_percentile)
        if (!item.diastolic_percentile) fields.push('diastolic_percentile')
        else BloodPressureDiastolicPercentileTypesValidator.validate(item.diastolic_percentile)
        if (!item.classification) fields.push('classification')
        else BloodPressurePercentileClassificationTypesValidator.validate(item.classification)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Blood Pressure validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
