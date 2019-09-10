import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { DentalLesionTypes } from '../utils/dental.lesion.types'

export class DentalLesionTypesValidator {
    public static validate(value: DentalLesionTypes): void | ValidationException {
        if (!Object.values(DentalLesionTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`lesion_type: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(DentalLesionTypes).join(', ').concat('.')))
        }
    }
}
