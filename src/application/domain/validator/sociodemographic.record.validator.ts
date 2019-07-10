import { ValidationException } from '../exception/validation.exception'
import { SociodemographicRecord } from '../model/sociodemographic.record'
import { ColorRaceTypesValidator } from './color.race.types.validator'
import { ScholarityLevelTypesValidator } from './scholarity.level.types.validator'

export class SociodemographicRecordValidator {
    public static validate(item: SociodemographicRecord): void | ValidationException {
        let fields: Array<string> = []

        if (!item.color_race) fields.push('color_race')
        else ColorRaceTypesValidator.validate(item.color_race)
        if (!item.mother_scholarity) fields.push('mother_scholarity')
        else ScholarityLevelTypesValidator.validate(item.mother_scholarity)
        if (!item.people_in_home) fields.push('people_in_home')

        fields = [...new Set(fields)]
        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Sociodemographic Record validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
