import { Patient } from '../model/patient'
import { ValidationException } from '../exception/validation.exception'
import { ObjectIdValidator } from './object.id.validator'
import { DateValidator } from './date.validator'
import { GenderTypesValidator } from './gender.types.validator'

export class PatientValidator {
    public static validate(user: Patient): void | ValidationException {
        const fields: Array<string> = []

        if (!user.name) fields.push('name')
        if (!user.gender) fields.push('gender')
        else GenderTypesValidator.validate(user.gender)
        if (!user.birth_date) fields.push('birth_date')
        else DateValidator.validate(user.birth_date)
        if (!user.pilotstudy_id) fields.push('pilotstudy_id')
        else ObjectIdValidator.validate(user.pilotstudy_id)

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Patient validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
