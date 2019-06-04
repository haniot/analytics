import { SleepHabit } from '../../../src/application/domain/model/sleep.habit'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: ', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: SleepHabit = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)
                assert.propertyVal(result, 'week_day_sleep', DefaultEntityMock.SLEEP_HABIT.week_day_sleep)
                assert.propertyVal(result, 'week_day_wake_up', DefaultEntityMock.SLEEP_HABIT.week_day_wake_up)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: SleepHabit = new SleepHabit().fromJSON({})
                assert.propertyVal(result, 'week_day_sleep', undefined)
                assert.propertyVal(result, 'week_day_wake_up', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: SleepHabit = new SleepHabit().fromJSON(JSON.stringify(DefaultEntityMock.SLEEP_HABIT))
                assert.propertyVal(result, 'week_day_sleep', DefaultEntityMock.SLEEP_HABIT.week_day_sleep)
                assert.propertyVal(result, 'week_day_wake_up', DefaultEntityMock.SLEEP_HABIT.week_day_wake_up)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: SleepHabit = new SleepHabit().fromJSON('')
                assert.propertyVal(result, 'week_day_sleep', undefined)
                assert.propertyVal(result, 'week_day_wake_up', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: SleepHabit = new SleepHabit().fromJSON('invalid')
                assert.propertyVal(result, 'week_day_sleep', undefined)
                assert.propertyVal(result, 'week_day_wake_up', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: SleepHabit = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)
            const result = model.toJSON()
            assert.propertyVal(result, 'week_day_sleep', DefaultEntityMock.SLEEP_HABIT.week_day_sleep)
            assert.propertyVal(result, 'week_day_wake_up', DefaultEntityMock.SLEEP_HABIT.week_day_wake_up)
        })
    })
})
