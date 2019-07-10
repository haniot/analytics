import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: PhysicalActivityHabits', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: PhysicalActivityHabits =
                    new PhysicalActivityHabits().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits)
                assert.deepPropertyVal(
                    result, 'school_activity_freq',
                    DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits.school_activity_freq)
                assert.deepPropertyVal(
                    result, 'weekly_activities',
                    DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits.weekly_activities)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: PhysicalActivityHabits = new PhysicalActivityHabits().fromJSON({})
                assert.deepPropertyVal(result, 'school_activity_freq', undefined)
                assert.deepPropertyVal(result, 'weekly_activities', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: PhysicalActivityHabits =
                    new PhysicalActivityHabits()
                        .fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits))
                assert.deepPropertyVal(
                    result, 'school_activity_freq',
                    DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits.school_activity_freq)
                assert.deepPropertyVal(
                    result, 'weekly_activities',
                    DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits.weekly_activities)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: PhysicalActivityHabits = new PhysicalActivityHabits().fromJSON('')
                assert.deepPropertyVal(result, 'school_activity_freq', undefined)
                assert.deepPropertyVal(result, 'weekly_activities', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: PhysicalActivityHabits = new PhysicalActivityHabits().fromJSON('invalid')
                assert.deepPropertyVal(result, 'school_activity_freq', undefined)
                assert.deepPropertyVal(result, 'weekly_activities', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: PhysicalActivityHabits =
                new PhysicalActivityHabits().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits)
            const result = model.toJSON()
            assert.deepPropertyVal(
                result, 'school_activity_freq',
                DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits.school_activity_freq)
            assert.deepPropertyVal(
                result, 'weekly_activities',
                DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits.weekly_activities)
        })
    })
})
