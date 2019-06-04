import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: FeedingHabitsRecord', () => {
    const data: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)

    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)
                assert.deepPropertyVal(result, 'weekly_feeding_habits', data.weekly_feeding_habits)
                assert.deepPropertyVal(result, 'food_allergy_intolerance', data.food_allergy_intolerance)
                assert.propertyVal(result, 'breakfast_daily_frequency', data.breakfast_daily_frequency)
                assert.propertyVal(result, 'six_month_breast_feeding', data.six_month_breast_feeding)
                assert.propertyVal(result, 'daily_water_glasses', data.daily_water_glasses)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON({})
                assert.deepPropertyVal(result, 'weekly_feeding_habits', undefined)
                assert.deepPropertyVal(result, 'food_allergy_intolerance', undefined)
                assert.propertyVal(result, 'breakfast_daily_frequency', undefined)
                assert.propertyVal(result, 'six_month_breast_feeding', undefined)
                assert.propertyVal(result, 'daily_water_glasses', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: FeedingHabitsRecord =
                    new FeedingHabitsRecord().fromJSON(JSON.stringify(DefaultEntityMock.FEEDING_HABITS_RECORD))
                assert.deepPropertyVal(result, 'weekly_feeding_habits', data.weekly_feeding_habits)
                assert.deepPropertyVal(result, 'food_allergy_intolerance', data.food_allergy_intolerance)
                assert.propertyVal(result, 'breakfast_daily_frequency', data.breakfast_daily_frequency)
                assert.propertyVal(result, 'six_month_breast_feeding', data.six_month_breast_feeding)
                assert.propertyVal(result, 'daily_water_glasses', data.daily_water_glasses)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON('')
                assert.deepPropertyVal(result, 'weekly_feeding_habits', undefined)
                assert.deepPropertyVal(result, 'food_allergy_intolerance', undefined)
                assert.propertyVal(result, 'breakfast_daily_frequency', undefined)
                assert.propertyVal(result, 'six_month_breast_feeding', undefined)
                assert.propertyVal(result, 'daily_water_glasses', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON('invalid')
                assert.deepPropertyVal(result, 'weekly_feeding_habits', undefined)
                assert.deepPropertyVal(result, 'food_allergy_intolerance', undefined)
                assert.propertyVal(result, 'breakfast_daily_frequency', undefined)
                assert.propertyVal(result, 'six_month_breast_feeding', undefined)
                assert.propertyVal(result, 'daily_water_glasses', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const result = data.toJSON()
            assert.deepPropertyVal(result, 'weekly_feeding_habits', DefaultEntityMock.FEEDING_HABITS_RECORD.weekly_feeding_habits)
            assert.deepPropertyVal(
                result, 'food_allergy_intolerance', DefaultEntityMock.FEEDING_HABITS_RECORD.food_allergy_intolerance)
            assert.propertyVal(
                result, 'breakfast_daily_frequency', DefaultEntityMock.FEEDING_HABITS_RECORD.breakfast_daily_frequency)
            assert.propertyVal(
                result, 'six_month_breast_feeding', DefaultEntityMock.FEEDING_HABITS_RECORD.six_month_breast_feeding)
            assert.propertyVal(
                result, 'daily_water_glasses', DefaultEntityMock.FEEDING_HABITS_RECORD.daily_water_glasses)
        })
    })
})
