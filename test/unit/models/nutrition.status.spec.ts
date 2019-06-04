import { NutritionStatus } from '../../../src/application/domain/model/nutrition.status'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: NutritionStatus', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionStatus =
                    new NutritionStatus().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status)
                assert.propertyVal(result, 'bmi', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.bmi)
                assert.propertyVal(
                    result, 'classification', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.classification)
                assert.propertyVal(result, 'height', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.height)
                assert.propertyVal(result, 'percentile', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.percentile)
                assert.propertyVal(result, 'weight', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.weight)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionStatus = new NutritionStatus().fromJSON({})
                assert.propertyVal(result, 'bmi', undefined)
                assert.propertyVal(result, 'classification', undefined)
                assert.propertyVal(result, 'height', undefined)
                assert.propertyVal(result, 'percentile', undefined)
                assert.propertyVal(result, 'weight', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionStatus =
                    new NutritionStatus().fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status))
                assert.propertyVal(result, 'bmi', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.bmi)
                assert.propertyVal(
                    result, 'classification', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.classification)
                assert.propertyVal(result, 'height', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.height)
                assert.propertyVal(result, 'percentile', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.percentile)
                assert.propertyVal(result, 'weight', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.weight)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionStatus = new NutritionStatus().fromJSON('')
                assert.propertyVal(result, 'bmi', undefined)
                assert.propertyVal(result, 'classification', undefined)
                assert.propertyVal(result, 'height', undefined)
                assert.propertyVal(result, 'percentile', undefined)
                assert.propertyVal(result, 'weight', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: NutritionStatus = new NutritionStatus().fromJSON('invalid')
                assert.propertyVal(result, 'bmi', undefined)
                assert.propertyVal(result, 'classification', undefined)
                assert.propertyVal(result, 'height', undefined)
                assert.propertyVal(result, 'percentile', undefined)
                assert.propertyVal(result, 'weight', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: NutritionStatus =
                new NutritionStatus().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status)
            const result = model.toJSON()
            assert.propertyVal(result, 'bmi', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.bmi)
            assert.propertyVal(result, 'classification', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.classification)
            assert.propertyVal(result, 'height', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.height)
            assert.propertyVal(result, 'percentile', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.percentile)
            assert.propertyVal(result, 'weight', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status.weight)
        })
    })
})
