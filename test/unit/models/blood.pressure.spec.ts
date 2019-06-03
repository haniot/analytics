import { BloodPressure } from '../../../src/application/domain/model/blood.pressure'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: BloodPressure', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodPressure = new BloodPressure().fromJSON(DefaultEntityMock.BLOOD_PRESSURE)
                assert.propertyVal(result, 'systolic', DefaultEntityMock.BLOOD_PRESSURE.systolic)
                assert.propertyVal(result, 'diastolic', DefaultEntityMock.BLOOD_PRESSURE.diastolic)
                assert.propertyVal(result, 'systolic_percentile', DefaultEntityMock.BLOOD_PRESSURE.systolic_percentile)
                assert.propertyVal(result, 'diastolic_percentile', DefaultEntityMock.BLOOD_PRESSURE.diastolic_percentile)
                assert.propertyVal(result, 'classification', DefaultEntityMock.BLOOD_PRESSURE.classification)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodPressure = new BloodPressure().fromJSON({})
                assert.propertyVal(result, 'systolic', undefined)
                assert.propertyVal(result, 'diastolic', undefined)
                assert.propertyVal(result, 'systolic_percentile', undefined)
                assert.propertyVal(result, 'diastolic_percentile', undefined)
                assert.propertyVal(result, 'classification', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodPressure = new BloodPressure().fromJSON(JSON.stringify(DefaultEntityMock.BLOOD_PRESSURE))
                assert.propertyVal(result, 'systolic', DefaultEntityMock.BLOOD_PRESSURE.systolic)
                assert.propertyVal(result, 'diastolic', DefaultEntityMock.BLOOD_PRESSURE.diastolic)
                assert.propertyVal(result, 'systolic_percentile', DefaultEntityMock.BLOOD_PRESSURE.systolic_percentile)
                assert.propertyVal(result, 'diastolic_percentile', DefaultEntityMock.BLOOD_PRESSURE.diastolic_percentile)
                assert.propertyVal(result, 'classification', DefaultEntityMock.BLOOD_PRESSURE.classification)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodPressure = new BloodPressure().fromJSON('')
                assert.propertyVal(result, 'systolic', undefined)
                assert.propertyVal(result, 'diastolic', undefined)
                assert.propertyVal(result, 'systolic_percentile', undefined)
                assert.propertyVal(result, 'diastolic_percentile', undefined)
                assert.propertyVal(result, 'classification', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: BloodPressure = new BloodPressure().fromJSON('invalid')
                assert.propertyVal(result, 'systolic', undefined)
                assert.propertyVal(result, 'diastolic', undefined)
                assert.propertyVal(result, 'systolic_percentile', undefined)
                assert.propertyVal(result, 'diastolic_percentile', undefined)
                assert.propertyVal(result, 'classification', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: BloodPressure = new BloodPressure().fromJSON(JSON.stringify(DefaultEntityMock.BLOOD_PRESSURE))
            const result = model.toJSON()
            assert.propertyVal(result, 'systolic', DefaultEntityMock.BLOOD_PRESSURE.systolic)
            assert.propertyVal(result, 'diastolic', DefaultEntityMock.BLOOD_PRESSURE.diastolic)
            assert.propertyVal(result, 'systolic_percentile', DefaultEntityMock.BLOOD_PRESSURE.systolic_percentile)
            assert.propertyVal(result, 'diastolic_percentile', DefaultEntityMock.BLOOD_PRESSURE.diastolic_percentile)
            assert.propertyVal(result, 'classification', DefaultEntityMock.BLOOD_PRESSURE.classification)
        })
    })
})
