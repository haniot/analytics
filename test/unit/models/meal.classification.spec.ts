import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { MealClassification } from '../../../src/application/domain/model/meal.classification'

describe('Models: MealClassification', () => {
    const data: MealClassification = new MealClassification().fromJSON(DefaultEntityMock.MEAL_CLASSIFICATION)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: MealClassification =
                    new MealClassification().fromJSON(DefaultEntityMock.MEAL_CLASSIFICATION)
                assert.deepPropertyVal(result, 'good', data.good)
                assert.deepPropertyVal(result, 'great', data.great)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: MealClassification = new MealClassification().fromJSON({})
                assert.deepPropertyVal(result, 'good', undefined)
                assert.deepPropertyVal(result, 'great', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: MealClassification =
                    new MealClassification().fromJSON(JSON.stringify(DefaultEntityMock.MEAL_CLASSIFICATION))
                assert.deepPropertyVal(result, 'good', data.good)
                assert.deepPropertyVal(result, 'great', data.great)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: MealClassification = new MealClassification().fromJSON('')
                assert.deepPropertyVal(result, 'good', undefined)
                assert.deepPropertyVal(result, 'great', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: MealClassification = new MealClassification().fromJSON('invalid')
                assert.deepPropertyVal(result, 'good', undefined)
                assert.deepPropertyVal(result, 'great', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: MealClassification =
                new MealClassification().fromJSON(DefaultEntityMock.MEAL_CLASSIFICATION)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'good', DefaultEntityMock.MEAL_CLASSIFICATION.good)
            assert.deepPropertyVal(result, 'great', DefaultEntityMock.MEAL_CLASSIFICATION.great)
        })
    })
})
