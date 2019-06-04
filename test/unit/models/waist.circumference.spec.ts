import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { WaistCircumferenceMeasurement } from '../../../src/application/domain/model/waist.circumference.measurement'

describe('Models: WaistCircumferenceMeasurement', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: WaistCircumferenceMeasurement =
                    new WaistCircumferenceMeasurement().fromJSON(DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT)
                assert.propertyVal(result, 'value', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: WaistCircumferenceMeasurement = new WaistCircumferenceMeasurement().fromJSON({})
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: WaistCircumferenceMeasurement =
                    new WaistCircumferenceMeasurement()
                        .fromJSON(JSON.stringify(DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT))
                assert.propertyVal(result, 'value', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: WaistCircumferenceMeasurement = new WaistCircumferenceMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: WaistCircumferenceMeasurement = new WaistCircumferenceMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: WaistCircumferenceMeasurement =
                new WaistCircumferenceMeasurement().fromJSON(DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT)
            const result = model.toJSON()
            assert.propertyVal(result, 'value', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.value)
            assert.propertyVal(result, 'unit', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.unit)
            assert.propertyVal(result, 'timestamp', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.timestamp)
            assert.propertyVal(result, 'device_id', DefaultEntityMock.WAIST_CIRCUMFERENCE_MEASUREMENT.device_id)
        })
    })
})
