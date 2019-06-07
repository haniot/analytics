import { ValidationException } from '../exception/validation.exception'
import { OralHealthRecord } from '../model/oral.health.record'
import { ToothBrushingFrequencyTypesValidator } from './tooth.brushing.frequency.types.validator'
import { DentalLesionTypesValidator } from './dental.lesion.types.validator'
import { ToothTypesValidator } from './tooth.types.validator'

export class OralHealthRecordValidator {
    public static validate(item: OralHealthRecord): void | ValidationException {
        let fields: Array<string> = []

        if (!item.teeth_brushing_freq) fields.push('teeth_brushing_freq')
        else ToothBrushingFrequencyTypesValidator.validate(item.teeth_brushing_freq)
        if (item.teeth_lesions && item.teeth_lesions.length) {
            item.teeth_lesions.forEach(value => {
                if (!value.lesion_type) fields.push('teeth_lesions.lesion_type')
                else DentalLesionTypesValidator.validate(value.lesion_type)
                if (!value.tooth_type) fields.push('teeth_lesions.tooth_type')
                else ToothTypesValidator.validate(value.tooth_type)
            })
        }
        if (!item.created_at) fields.push('created_at')

        fields = [...new Set(fields)]
        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Oral Health Record validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
