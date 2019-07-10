import { AgeBmiPercentile } from '../../../src/application/domain/model/age.bmi.percentile'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: AgeBmiPercentile', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result = new AgeBmiPercentile().fromJSON(DefaultEntityMock.AGE_BMI_PERCENTILE)
                assert.propertyVal(result, 'age', DefaultEntityMock.AGE_BMI_PERCENTILE.age)
                assert.propertyVal(result, 'p01', DefaultEntityMock.AGE_BMI_PERCENTILE.p01)
                assert.propertyVal(result, 'p3', DefaultEntityMock.AGE_BMI_PERCENTILE.p3)
                assert.propertyVal(result, 'p85', DefaultEntityMock.AGE_BMI_PERCENTILE.p85)
                assert.propertyVal(result, 'p97', DefaultEntityMock.AGE_BMI_PERCENTILE.p97)
                assert.propertyVal(result, 'p999', DefaultEntityMock.AGE_BMI_PERCENTILE.p999)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result = new AgeBmiPercentile().fromJSON({})
                assert.propertyVal(result, 'age', undefined)
                assert.propertyVal(result, 'p01', undefined)
                assert.propertyVal(result, 'p3', undefined)
                assert.propertyVal(result, 'p85', undefined)
                assert.propertyVal(result, 'p97', undefined)
                assert.propertyVal(result, 'p999', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result = new AgeBmiPercentile().fromJSON(JSON.stringify(DefaultEntityMock.AGE_BMI_PERCENTILE))
                assert.propertyVal(result, 'age', DefaultEntityMock.AGE_BMI_PERCENTILE.age)
                assert.propertyVal(result, 'p01', DefaultEntityMock.AGE_BMI_PERCENTILE.p01)
                assert.propertyVal(result, 'p3', DefaultEntityMock.AGE_BMI_PERCENTILE.p3)
                assert.propertyVal(result, 'p85', DefaultEntityMock.AGE_BMI_PERCENTILE.p85)
                assert.propertyVal(result, 'p97', DefaultEntityMock.AGE_BMI_PERCENTILE.p97)
                assert.propertyVal(result, 'p999', DefaultEntityMock.AGE_BMI_PERCENTILE.p999)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result = new AgeBmiPercentile().fromJSON('')
                assert.propertyVal(result, 'age', undefined)
                assert.propertyVal(result, 'p01', undefined)
                assert.propertyVal(result, 'p3', undefined)
                assert.propertyVal(result, 'p85', undefined)
                assert.propertyVal(result, 'p97', undefined)
                assert.propertyVal(result, 'p999', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result = new AgeBmiPercentile().fromJSON('invalid')
                assert.propertyVal(result, 'age', undefined)
                assert.propertyVal(result, 'p01', undefined)
                assert.propertyVal(result, 'p3', undefined)
                assert.propertyVal(result, 'p85', undefined)
                assert.propertyVal(result, 'p97', undefined)
                assert.propertyVal(result, 'p999', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: AgeBmiPercentile = new AgeBmiPercentile().fromJSON(DefaultEntityMock.AGE_BMI_PERCENTILE)
            const result = model.toJSON()
            assert.propertyVal(result, 'age', DefaultEntityMock.AGE_BMI_PERCENTILE.age)
            assert.deepPropertyVal(result, 'percentile', {
                p01: DefaultEntityMock.AGE_BMI_PERCENTILE.p01,
                p3: DefaultEntityMock.AGE_BMI_PERCENTILE.p3,
                p85: DefaultEntityMock.AGE_BMI_PERCENTILE.p85,
                p97: DefaultEntityMock.AGE_BMI_PERCENTILE.p97,
                p999: DefaultEntityMock.AGE_BMI_PERCENTILE.p999
            })
        })
    })
})
