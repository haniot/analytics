import { MealClassificationLevel } from '../../../src/application/domain/model/meal.classification.level'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: MealClassificationLevel', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: MealClassificationLevel =
                    new MealClassificationLevel().fromJSON(DefaultEntityMock.MEAL_CLASSIFICATION_LEVEL)
                assert.propertyVal(result, 'min', DefaultEntityMock.MEAL_CLASSIFICATION_LEVEL.min)
                assert.propertyVal(result, 'max', DefaultEntityMock.MEAL_CLASSIFICATION_LEVEL.max)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: MealClassificationLevel = new MealClassificationLevel().fromJSON({})
                assert.propertyVal(result, 'min', undefined)
                assert.propertyVal(result, 'max', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: MealClassificationLevel =
                    new MealClassificationLevel().fromJSON(JSON.stringify(DefaultEntityMock.MEAL_CLASSIFICATION_LEVEL))
                assert.propertyVal(result, 'min', DefaultEntityMock.MEAL_CLASSIFICATION_LEVEL.min)
                assert.propertyVal(result, 'max', DefaultEntityMock.MEAL_CLASSIFICATION_LEVEL.max)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: MealClassificationLevel = new MealClassificationLevel().fromJSON('')
                assert.propertyVal(result, 'min', undefined)
                assert.propertyVal(result, 'max', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: MealClassificationLevel = new MealClassificationLevel().fromJSON('invalid')
                assert.propertyVal(result, 'min', undefined)
                assert.propertyVal(result, 'max', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: MealClassificationLevel =
                new MealClassificationLevel().fromJSON(DefaultEntityMock.MEAL_CLASSIFICATION_LEVEL)
            const result = model.toJSON()
            assert.propertyVal(result, 'min', DefaultEntityMock.MEAL_CLASSIFICATION_LEVEL.min)
            assert.propertyVal(result, 'max', DefaultEntityMock.MEAL_CLASSIFICATION_LEVEL.max)
        })
    })
})
