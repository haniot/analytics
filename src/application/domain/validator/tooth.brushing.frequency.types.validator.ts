import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { ToothBrushingFrequencyTypes } from '../utils/tooth.brushing.frequency.types'

export class ToothBrushingFrequencyTypesValidator {
    public static validate(value: ToothBrushingFrequencyTypes): void | ValidationException {
        if (!Object.values(ToothBrushingFrequencyTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`teeth_brushing_freq: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ToothBrushingFrequencyTypes).join(', ').concat('.')))
        }
    }
}
