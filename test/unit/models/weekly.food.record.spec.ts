import { WeeklyFoodRecord } from '../../../src/application/domain/model/weekly.food.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: WeeklyFoodRecord', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: WeeklyFoodRecord =
                    new WeeklyFoodRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits[0])
                assert.propertyVal(result, 'food', DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits[0].food)
                assert.propertyVal(
                    result, 'seven_days_freq', DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits[0].seven_days_freq)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: WeeklyFoodRecord = new WeeklyFoodRecord().fromJSON({})
                assert.propertyVal(result, 'food', undefined)
                assert.propertyVal(result, 'seven_days_freq', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: WeeklyFoodRecord =
                    new WeeklyFoodRecord()
                        .fromJSON(JSON.stringify(DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits[0]))
                assert.propertyVal(result, 'food', DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits[0].food)
                assert.propertyVal(
                    result, 'seven_days_freq', DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits[0].seven_days_freq)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: WeeklyFoodRecord = new WeeklyFoodRecord().fromJSON('')
                assert.propertyVal(result, 'food', undefined)
                assert.propertyVal(result, 'seven_days_freq', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: WeeklyFoodRecord = new WeeklyFoodRecord().fromJSON('invalid')
                assert.propertyVal(result, 'food', undefined)
                assert.propertyVal(result, 'seven_days_freq', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: WeeklyFoodRecord =
                new WeeklyFoodRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits[0])
            const result = model.toJSON()
            assert.propertyVal(result, 'food', DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits[0].food)
            assert.propertyVal(
                result, 'seven_days_freq', DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits[0].seven_days_freq)
        })
    })
})
