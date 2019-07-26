import { Data } from '../model/data'
import { ValidationException } from '../exception/validation.exception'
import { ObjectIdValidator } from './object.id.validator'

export class CreateDataValidator {
    public static validate(item: Data): void | ValidationException {
        const fields: Array<string> = []

        if (!item.total_patients) fields.push('total_patients')
        if (!item.file_csv) fields.push('file_csv')
        if (!item.file_xls) fields.push('file_xls')
        if (!item.pilotstudy_id) fields.push('pilotstudy_id')
        else ObjectIdValidator.validate(item.pilotstudy_id)

        if (fields.length) {
            throw new ValidationException('Required fields were not provided...',
                'Data Request validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
