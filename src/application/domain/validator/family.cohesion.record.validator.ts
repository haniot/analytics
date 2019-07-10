import { ValidationException } from '../exception/validation.exception'
import { FamilyCohesionRecord } from '../model/family.cohesion.record'
import { FamilyCohesionFrequencyTypesValidator } from './family.cohesion.frequency.types.validator'

export class FamilyCohesionRecordValidator {
    public static validate(item: FamilyCohesionRecord): void | ValidationException {
        let fields: Array<string> = []

        if (!item.family_mutual_aid_freq) fields.push('family_mutual_aid_freq')
        else FamilyCohesionFrequencyTypesValidator.validate(item.family_mutual_aid_freq, 'family_mutual_aid_freq')
        if (!item.friendship_approval_freq) fields.push('friendship_approval_freq')
        else FamilyCohesionFrequencyTypesValidator.validate(item.friendship_approval_freq, 'friendship_approval_freq')
        if (!item.family_only_task_freq) fields.push('family_only_task_freq')
        else FamilyCohesionFrequencyTypesValidator.validate(item.family_only_task_freq, 'family_only_task_freq')
        if (!item.family_only_preference_freq) fields.push('family_only_preference_freq')
        else FamilyCohesionFrequencyTypesValidator
            .validate(item.family_only_preference_freq, 'family_only_preference_freq')
        if (!item.free_time_together_freq) fields.push('free_time_together_freq')
        else FamilyCohesionFrequencyTypesValidator
            .validate(item.free_time_together_freq, 'free_time_together_freq')
        if (!item.family_proximity_perception_freq) fields.push('family_proximity_perception_freq')
        else FamilyCohesionFrequencyTypesValidator
            .validate(item.family_proximity_perception_freq, 'family_proximity_perception_freq')
        if (!item.all_family_tasks_freq) fields.push('all_family_tasks_freq')
        else FamilyCohesionFrequencyTypesValidator.validate(item.all_family_tasks_freq, 'all_family_tasks_freq')
        if (!item.family_tasks_opportunity_freq) fields.push('family_tasks_opportunity_freq')
        else FamilyCohesionFrequencyTypesValidator
            .validate(item.family_tasks_opportunity_freq, 'family_tasks_opportunity_freq')
        if (!item.family_decision_support_freq) fields.push('family_decision_support_freq')
        else FamilyCohesionFrequencyTypesValidator
            .validate(item.family_decision_support_freq, 'family_decision_support_freq')
        if (!item.family_union_relevance_freq) fields.push('family_union_relevance_freq')
        else FamilyCohesionFrequencyTypesValidator
            .validate(item.family_union_relevance_freq, 'family_union_relevance_freq')
        if (!item.family_cohesion_result) fields.push('family_cohesion_result')

        fields = [...new Set(fields)]
        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Family Cohesion Record validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
