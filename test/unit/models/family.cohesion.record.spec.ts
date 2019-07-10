import { FamilyCohesionRecord } from '../../../src/application/domain/model/family.cohesion.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: ', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)
                assert.propertyVal(
                    result, 'family_mutual_aid_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
                assert.propertyVal(
                    result, 'friendship_approval_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
                assert.propertyVal(
                    result, 'family_only_task_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq)
                assert.propertyVal(
                    result, 'family_only_preference_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
                assert.propertyVal(
                    result, 'free_time_together_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
                assert.propertyVal(
                    result, 'family_proximity_perception_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
                assert.propertyVal(
                    result, 'all_family_tasks_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
                assert.propertyVal(
                    result, 'family_tasks_opportunity_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
                assert.propertyVal(
                    result, 'family_decision_support_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
                assert.propertyVal(
                    result, 'family_union_relevance_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
                assert.propertyVal(
                    result, 'family_cohesion_result', DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({})
                assert.propertyVal(result, 'family_mutual_aid_freq', undefined)
                assert.propertyVal(result, 'friendship_approval_freq', undefined)
                assert.propertyVal(result, 'family_only_task_freq', undefined)
                assert.propertyVal(result, 'family_only_preference_freq', undefined)
                assert.propertyVal(result, 'free_time_together_freq', undefined)
                assert.propertyVal(result, 'family_proximity_perception_freq', undefined)
                assert.propertyVal(result, 'all_family_tasks_freq', undefined)
                assert.propertyVal(result, 'family_tasks_opportunity_freq', undefined)
                assert.propertyVal(result, 'family_decision_support_freq', undefined)
                assert.propertyVal(result, 'family_union_relevance_freq', undefined)
                assert.propertyVal(result, 'family_cohesion_result', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: FamilyCohesionRecord =
                    new FamilyCohesionRecord().fromJSON(JSON.stringify(DefaultEntityMock.FAMILY_COHESION_RECORD))
                assert.propertyVal(
                    result, 'family_mutual_aid_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
                assert.propertyVal(
                    result, 'friendship_approval_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
                assert.propertyVal(
                    result, 'family_only_task_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq)
                assert.propertyVal(
                    result, 'family_only_preference_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
                assert.propertyVal(
                    result, 'free_time_together_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
                assert.propertyVal(
                    result, 'family_proximity_perception_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
                assert.propertyVal(
                    result, 'all_family_tasks_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
                assert.propertyVal(
                    result, 'family_tasks_opportunity_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
                assert.propertyVal(
                    result, 'family_decision_support_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
                assert.propertyVal(
                    result, 'family_union_relevance_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
                assert.propertyVal(
                    result, 'family_cohesion_result', DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON('')
                assert.propertyVal(result, 'family_mutual_aid_freq', undefined)
                assert.propertyVal(result, 'friendship_approval_freq', undefined)
                assert.propertyVal(result, 'family_only_task_freq', undefined)
                assert.propertyVal(result, 'family_only_preference_freq', undefined)
                assert.propertyVal(result, 'free_time_together_freq', undefined)
                assert.propertyVal(result, 'family_proximity_perception_freq', undefined)
                assert.propertyVal(result, 'all_family_tasks_freq', undefined)
                assert.propertyVal(result, 'family_tasks_opportunity_freq', undefined)
                assert.propertyVal(result, 'family_decision_support_freq', undefined)
                assert.propertyVal(result, 'family_union_relevance_freq', undefined)
                assert.propertyVal(result, 'family_cohesion_result', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON('invalid')
                assert.propertyVal(result, 'family_mutual_aid_freq', undefined)
                assert.propertyVal(result, 'friendship_approval_freq', undefined)
                assert.propertyVal(result, 'family_only_task_freq', undefined)
                assert.propertyVal(result, 'family_only_preference_freq', undefined)
                assert.propertyVal(result, 'free_time_together_freq', undefined)
                assert.propertyVal(result, 'family_proximity_perception_freq', undefined)
                assert.propertyVal(result, 'all_family_tasks_freq', undefined)
                assert.propertyVal(result, 'family_tasks_opportunity_freq', undefined)
                assert.propertyVal(result, 'family_decision_support_freq', undefined)
                assert.propertyVal(result, 'family_union_relevance_freq', undefined)
                assert.propertyVal(result, 'family_cohesion_result', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)
            const result = model.toJSON()
            assert.propertyVal(
                result, 'family_mutual_aid_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
            assert.propertyVal(
                result, 'friendship_approval_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
            assert.propertyVal(
                result, 'family_only_task_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq)
            assert.propertyVal(
                result, 'family_only_preference_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
            assert.propertyVal(
                result, 'free_time_together_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
            assert.propertyVal(
                result, 'family_proximity_perception_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
            assert.propertyVal(
                result, 'all_family_tasks_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
            assert.propertyVal(
                result, 'family_tasks_opportunity_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
            assert.propertyVal(
                result, 'family_decision_support_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
            assert.propertyVal(
                result, 'family_union_relevance_freq', DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
            assert.propertyVal(
                result, 'family_cohesion_result', DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
        })
    })
})
