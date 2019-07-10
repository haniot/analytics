import { OverweightIndicator } from '../../../src/application/domain/model/overweight.indicator'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: OverweightIndicator', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: OverweightIndicator =
                    new OverweightIndicator().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator)
                assert.propertyVal(
                    result, 'classification', DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.classification)
                assert.propertyVal(result, 'height', DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.height)
                assert.propertyVal(
                    result, 'waist_circumference',
                    DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.waist_circumference)
                assert.propertyVal(
                    result, 'waist_height_relation',
                    DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.waist_height_relation)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: OverweightIndicator = new OverweightIndicator().fromJSON({})
                assert.propertyVal(result, 'classification', undefined)
                assert.propertyVal(result, 'height', undefined)
                assert.propertyVal(result, 'waist_circumference', undefined)
                assert.propertyVal(result, 'waist_height_relation', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: OverweightIndicator =
                    new OverweightIndicator()
                        .fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator))
                assert.propertyVal(
                    result, 'classification', DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.classification)
                assert.propertyVal(result, 'height', DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.height)
                assert.propertyVal(
                    result, 'waist_circumference',
                    DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.waist_circumference)
                assert.propertyVal(
                    result, 'waist_height_relation',
                    DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.waist_height_relation)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: OverweightIndicator = new OverweightIndicator().fromJSON('')
                assert.propertyVal(result, 'classification', undefined)
                assert.propertyVal(result, 'height', undefined)
                assert.propertyVal(result, 'waist_circumference', undefined)
                assert.propertyVal(result, 'waist_height_relation', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: OverweightIndicator = new OverweightIndicator().fromJSON('invalid')
                assert.propertyVal(result, 'classification', undefined)
                assert.propertyVal(result, 'height', undefined)
                assert.propertyVal(result, 'waist_circumference', undefined)
                assert.propertyVal(result, 'waist_height_relation', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: OverweightIndicator =
                new OverweightIndicator().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator)
            const result = model.toJSON()
            assert.propertyVal(
                result, 'classification', DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.classification)
            assert.propertyVal(result, 'height', DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.height)
            assert.propertyVal(
                result, 'waist_circumference',
                DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.waist_circumference)
            assert.propertyVal(
                result, 'waist_height_relation',
                DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator.waist_height_relation)
        })
    })
})
