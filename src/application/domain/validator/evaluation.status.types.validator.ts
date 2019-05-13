import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { EvaluationStatusTypes } from '../utils/evaluation.status.types'

export class EvaluationStatusTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(EvaluationStatusTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`status: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(EvaluationStatusTypes).join(', ').concat('.')))
        }
    }
}
