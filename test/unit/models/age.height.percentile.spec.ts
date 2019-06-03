import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { AgeHeightPercentile } from '../../../src/application/domain/model/age.height.percentile'

describe('Models: AgeHeightPercentile', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: AgeHeightPercentile = new AgeHeightPercentile().fromJSON(DefaultEntityMock.AGE_HEIGHT_PERCENTILE)
                assert.propertyVal(result, 'age', DefaultEntityMock.AGE_HEIGHT_PERCENTILE.age)
                assert.propertyVal(result, 'height', DefaultEntityMock.AGE_HEIGHT_PERCENTILE.height)
                assert.propertyVal(result, 'percentile', DefaultEntityMock.AGE_HEIGHT_PERCENTILE.percentile)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: AgeHeightPercentile = new AgeHeightPercentile().fromJSON({})
                assert.propertyVal(result, 'age', undefined)
                assert.propertyVal(result, 'height', undefined)
                assert.propertyVal(result, 'percentile', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: AgeHeightPercentile =
                    new AgeHeightPercentile().fromJSON(JSON.stringify(DefaultEntityMock.AGE_HEIGHT_PERCENTILE))
                assert.propertyVal(result, 'age', DefaultEntityMock.AGE_HEIGHT_PERCENTILE.age)
                assert.propertyVal(result, 'height', DefaultEntityMock.AGE_HEIGHT_PERCENTILE.height)
                assert.propertyVal(result, 'percentile', DefaultEntityMock.AGE_HEIGHT_PERCENTILE.percentile)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: AgeHeightPercentile = new AgeHeightPercentile().fromJSON('')
                assert.propertyVal(result, 'age', undefined)
                assert.propertyVal(result, 'height', undefined)
                assert.propertyVal(result, 'percentile', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: AgeHeightPercentile = new AgeHeightPercentile().fromJSON('invalid')
                assert.propertyVal(result, 'age', undefined)
                assert.propertyVal(result, 'height', undefined)
                assert.propertyVal(result, 'percentile', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: AgeHeightPercentile = new AgeHeightPercentile().fromJSON(DefaultEntityMock.AGE_HEIGHT_PERCENTILE)
            const result = model.toJSON()
            assert.propertyVal(result, 'age', DefaultEntityMock.AGE_HEIGHT_PERCENTILE.age)
            assert.propertyVal(result, 'height', DefaultEntityMock.AGE_HEIGHT_PERCENTILE.height)
            assert.propertyVal(result, 'percentile', DefaultEntityMock.AGE_HEIGHT_PERCENTILE.percentile)
        })
    })
})
