import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { ChronicDiseaseTypes } from '../utils/chronic.disease.types'
import { DiseaseHistoryTypes } from '../utils/disease.history.types'

export class ChronicDiseaseValidator {
    public static validate(value: any): void | ValidationException {
        if (!Object.values(ChronicDiseaseTypes).includes(value.type)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`type: ${value.type}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ChronicDiseaseTypes).join(', ').concat('.')))
        }

        if (!Object.values(DiseaseHistoryTypes).includes(value.disease_history)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`disease_history: ${value.disease_history}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(DiseaseHistoryTypes).join(', ').concat('.')))
        }
    }
}
