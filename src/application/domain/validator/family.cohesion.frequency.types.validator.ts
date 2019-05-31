import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { FamilyCohesionFrequencyTypes } from '../utils/family.cohesion.frequency.types'

export class FamilyCohesionFrequencyTypesValidator {
    public static validate(value: string, parameter: string): void | ValidationException {
        if (!Object.values(FamilyCohesionFrequencyTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`${parameter}: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(FamilyCohesionFrequencyTypes).join(', ').concat('.')))
        }
    }
}
