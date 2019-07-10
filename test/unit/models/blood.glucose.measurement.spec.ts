import { BloodGlucoseMeasurement } from '../../../src/application/domain/model/blood.glucose.measurement'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: BloodGlucoseMeasurement', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodGlucoseMeasurement =
                    new BloodGlucoseMeasurement().fromJSON(DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT)
                assert.propertyVal(result, 'value', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.value)
                assert.propertyVal(result, 'meal', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.meal)
                assert.propertyVal(result, 'unit', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.unit)
                assert.propertyVal(result, 'type', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.type)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodGlucoseMeasurement =
                    new BloodGlucoseMeasurement().fromJSON({})
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'meal', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodGlucoseMeasurement =
                    new BloodGlucoseMeasurement().fromJSON(JSON.stringify(DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT))
                assert.propertyVal(result, 'value', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.value)
                assert.propertyVal(result, 'meal', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.meal)
                assert.propertyVal(result, 'unit', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.device_id)

            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodGlucoseMeasurement =
                    new BloodGlucoseMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'meal', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: BloodGlucoseMeasurement =
                    new BloodGlucoseMeasurement().fromJSON('invalid')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'meal', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: BloodGlucoseMeasurement =
                new BloodGlucoseMeasurement().fromJSON(DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT)
            const result = model.toJSON()
            assert.propertyVal(result, 'value', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.value)
            assert.propertyVal(result, 'meal', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.meal)
            assert.propertyVal(result, 'unit', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.unit)
            assert.propertyVal(result, 'type', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.type)
            assert.propertyVal(result, 'timestamp', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.timestamp)
            assert.propertyVal(result, 'device_id', DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.device_id)
        })
    })
})
