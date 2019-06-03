import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { FoodTypes } from '../utils/food.types'

export class FoodTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(FoodTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`weekly_food_record.food: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(FoodTypes).join(', ').concat('.')))
        }
    }
}
