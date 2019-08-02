import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { BloodGlucose } from '../../../src/application/domain/model/blood.glucose'

describe('Models: BloodGlucose', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodGlucose =
                    new BloodGlucose().fromJSON(DefaultEntityMock.BLOOD_GLUCOSE)
                assert.propertyVal(result, 'value', DefaultEntityMock.BLOOD_GLUCOSE.value)
                assert.propertyVal(result, 'meal', DefaultEntityMock.BLOOD_GLUCOSE.meal)
                assert.propertyVal(result, 'classification', DefaultEntityMock.BLOOD_GLUCOSE.classification)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodGlucose =
                    new BloodGlucose().fromJSON({})
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'meal', undefined)
                assert.propertyVal(result, 'classification', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodGlucose =
                    new BloodGlucose().fromJSON(JSON.stringify(DefaultEntityMock.BLOOD_GLUCOSE))
                assert.propertyVal(result, 'value', DefaultEntityMock.BLOOD_GLUCOSE.value)
                assert.propertyVal(result, 'meal', DefaultEntityMock.BLOOD_GLUCOSE.meal)
                assert.propertyVal(result, 'classification', DefaultEntityMock.BLOOD_GLUCOSE.classification)

            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodGlucose =
                    new BloodGlucose().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'meal', undefined)
                assert.propertyVal(result, 'classification', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: BloodGlucose =
                    new BloodGlucose().fromJSON('invalid')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'meal', undefined)
                assert.propertyVal(result, 'classification', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: BloodGlucose =
                new BloodGlucose().fromJSON(DefaultEntityMock.BLOOD_GLUCOSE)
            const result = model.toJSON()
            assert.propertyVal(result, 'value', DefaultEntityMock.BLOOD_GLUCOSE.value)
            assert.propertyVal(result, 'meal', DefaultEntityMock.BLOOD_GLUCOSE.meal)
            assert.propertyVal(result, 'classification', DefaultEntityMock.BLOOD_GLUCOSE.classification)
        })
    })
})
