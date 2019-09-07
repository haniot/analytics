import { QuestionnaireRecord } from './questionnaire.record'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { QuestionnaireTypes } from '../utils/questionnaire.types'
import { JsonUtils } from '../utils/json.utils'
import { FamilyCohesionFrequencyTypes } from '../utils/family.cohesion.frequency.types'

export class FamilyCohesionRecord extends QuestionnaireRecord
    implements IJSONSerializable, IJSONDeserializable<FamilyCohesionRecord> {
    private _family_mutual_aid_freq?: FamilyCohesionFrequencyTypes
    private _friendship_approval_freq?: FamilyCohesionFrequencyTypes
    private _family_only_task_freq?: FamilyCohesionFrequencyTypes
    private _family_only_preference_freq?: FamilyCohesionFrequencyTypes
    private _free_time_together_freq?: FamilyCohesionFrequencyTypes
    private _family_proximity_perception_freq?: FamilyCohesionFrequencyTypes
    private _all_family_tasks_freq?: FamilyCohesionFrequencyTypes
    private _family_tasks_opportunity_freq?: FamilyCohesionFrequencyTypes
    private _family_decision_support_freq?: FamilyCohesionFrequencyTypes
    private _family_union_relevance_freq?: FamilyCohesionFrequencyTypes
    private _family_cohesion_result?: number

    constructor() {
        super()
        super.type = QuestionnaireTypes.FAMILY_COHESION_RECORD
    }

    get family_mutual_aid_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._family_mutual_aid_freq
    }

    set family_mutual_aid_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._family_mutual_aid_freq = value
    }

    get friendship_approval_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._friendship_approval_freq
    }

    set friendship_approval_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._friendship_approval_freq = value
    }

    get family_only_task_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._family_only_task_freq
    }

    set family_only_task_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._family_only_task_freq = value
    }

    get family_only_preference_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._family_only_preference_freq
    }

    set family_only_preference_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._family_only_preference_freq = value
    }

    get free_time_together_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._free_time_together_freq
    }

    set free_time_together_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._free_time_together_freq = value
    }

    get family_proximity_perception_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._family_proximity_perception_freq
    }

    set family_proximity_perception_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._family_proximity_perception_freq = value
    }

    get all_family_tasks_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._all_family_tasks_freq
    }

    set all_family_tasks_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._all_family_tasks_freq = value
    }

    get family_tasks_opportunity_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._family_tasks_opportunity_freq
    }

    set family_tasks_opportunity_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._family_tasks_opportunity_freq = value
    }

    get family_decision_support_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._family_decision_support_freq
    }

    set family_decision_support_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._family_decision_support_freq = value
    }

    get family_union_relevance_freq(): FamilyCohesionFrequencyTypes | undefined {
        return this._family_union_relevance_freq
    }

    set family_union_relevance_freq(value: FamilyCohesionFrequencyTypes | undefined) {
        this._family_union_relevance_freq = value
    }

    get family_cohesion_result(): number | undefined {
        return this._family_cohesion_result
    }

    set family_cohesion_result(value: number | undefined) {
        this._family_cohesion_result = value
    }

    public fromJSON(json: any): FamilyCohesionRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        super.fromJSON(json)
        if (json.family_mutual_aid_freq !== undefined) this.family_mutual_aid_freq = json.family_mutual_aid_freq
        if (json.friendship_approval_freq !== undefined) this.friendship_approval_freq = json.friendship_approval_freq
        if (json.family_only_task_freq !== undefined) this.family_only_task_freq = json.family_only_task_freq
        if (json.family_only_preference_freq !== undefined) this.family_only_preference_freq = json.family_only_preference_freq
        if (json.free_time_together_freq !== undefined) this.free_time_together_freq = json.free_time_together_freq
        if (json.family_proximity_perception_freq !== undefined)
            this.family_proximity_perception_freq = json.family_proximity_perception_freq
        if (json.all_family_tasks_freq !== undefined) this.all_family_tasks_freq = json.all_family_tasks_freq
        if (json.family_tasks_opportunity_freq !== undefined)
            this.family_tasks_opportunity_freq = json.family_tasks_opportunity_freq
        if (json.family_decision_support_freq !== undefined) this.family_decision_support_freq = json.family_decision_support_freq
        if (json.family_union_relevance_freq !== undefined) this.family_union_relevance_freq = json.family_union_relevance_freq
        if (json.family_cohesion_result !== undefined) this.family_cohesion_result = json.family_cohesion_result
        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{
                family_mutual_aid_freq: this.family_mutual_aid_freq,
                friendship_approval_freq: this.friendship_approval_freq,
                family_only_task_freq: this.family_only_task_freq,
                family_only_preference_freq: this.family_only_preference_freq,
                free_time_together_freq: this.free_time_together_freq,
                family_proximity_perception_freq: this.family_proximity_perception_freq,
                all_family_tasks_freq: this.all_family_tasks_freq,
                family_tasks_opportunity_freq: this.family_tasks_opportunity_freq,
                family_decision_support_freq: this.family_decision_support_freq,
                family_union_relevance_freq: this.family_union_relevance_freq,
                family_cohesion_result: this.family_cohesion_result
            }
        }
    }
}
