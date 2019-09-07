import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { FoodAllergyIntoleranceTypes } from '../utils/food.allergy.intolerance.types'

export class FoodAllergyIntoleranceTypesValidator {
    public static validate(value: FoodAllergyIntoleranceTypes): void | ValidationException {
        if (!Object.values(FoodAllergyIntoleranceTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`food_allergy_intolerance: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(FoodAllergyIntoleranceTypes).join(', ').concat('.')))
        }
    }
}
