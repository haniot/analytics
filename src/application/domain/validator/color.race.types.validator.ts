import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { ColorRaceTypes } from '../utils/color.race.types'

export class ColorRaceTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(ColorRaceTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`color_race: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ColorRaceTypes).join(', ').concat('.')))
        }
    }
}
