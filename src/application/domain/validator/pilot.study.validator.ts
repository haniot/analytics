import { PilotStudy } from '../model/pilot.study'
import { ValidationException } from '../exception/validation.exception'

export class PilotStudyValidator {
    public static validate(item: PilotStudy) {
        const fields: Array<string> = []

        if (!item.id) fields.push('id')
        if (!item.name) fields.push('name')

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Pilot Study validation: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
