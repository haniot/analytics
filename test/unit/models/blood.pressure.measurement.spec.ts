import { BloodPressureMeasurement } from '../../../src/application/domain/model/blood.pressure.measurement'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: BloodPressureMeasurement', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodPressureMeasurement =
                    new BloodPressureMeasurement().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT)
                assert.propertyVal(result, 'systolic', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.systolic)
                assert.propertyVal(result, 'diastolic', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.diastolic)
                assert.propertyVal(result, 'pulse', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.pulse)
                assert.propertyVal(result, 'unit', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodPressureMeasurement = new BloodPressureMeasurement().fromJSON({})
                assert.propertyVal(result, 'systolic', undefined)
                assert.propertyVal(result, 'diastolic', undefined)
                assert.propertyVal(result, 'pulse', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodPressureMeasurement =
                    new BloodPressureMeasurement().fromJSON(JSON.stringify(DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT))
                assert.propertyVal(result, 'systolic', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.systolic)
                assert.propertyVal(result, 'diastolic', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.diastolic)
                assert.propertyVal(result, 'pulse', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.pulse)
                assert.propertyVal(result, 'unit', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodPressureMeasurement = new BloodPressureMeasurement().fromJSON('')
                assert.propertyVal(result, 'systolic', undefined)
                assert.propertyVal(result, 'diastolic', undefined)
                assert.propertyVal(result, 'pulse', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: BloodPressureMeasurement = new BloodPressureMeasurement().fromJSON('invalid')
                assert.propertyVal(result, 'systolic', undefined)
                assert.propertyVal(result, 'diastolic', undefined)
                assert.propertyVal(result, 'pulse', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: BloodPressureMeasurement =
                new BloodPressureMeasurement().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT)
            const result = model.toJSON()
            assert.propertyVal(result, 'systolic', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.systolic)
            assert.propertyVal(result, 'diastolic', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.diastolic)
            assert.propertyVal(result, 'pulse', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.pulse)
            assert.propertyVal(result, 'unit', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.unit)
            assert.propertyVal(result, 'type', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.type)
            assert.propertyVal(result, 'timestamp', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.timestamp)
            assert.propertyVal(result, 'device_id', DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.device_id)
        })
    })
})
