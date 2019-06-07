import { MedicalRecord } from '../model/medical.record'
import { ValidationException } from '../exception/validation.exception'
import { ChronicDiseaseValidator } from './chronic.disease.validator'

export class MedicalRecordValidator {
    public static validate(item: MedicalRecord): void | ValidationException {
        let fields: Array<string> = []

        if (!item.chronic_diseases) fields.push('chronic_diseases')
        else item.chronic_diseases.forEach((value: any) => {
            if (!value.type) fields.push('chronic_disease.type')
            else if (!value.disease_history) fields.push('chronic_disease.disease_history')
            else ChronicDiseaseValidator.validate(value)
        })
        if (!item.created_at) fields.push('created_at')

        fields = [...new Set(fields)]
        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Medical Record validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
