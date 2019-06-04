import { BodyTemperatureMeasurement } from '../../../src/application/domain/model/body.temperature.measurement'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: BodyTemperatureMeasurement', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BodyTemperatureMeasurement =
                    new BodyTemperatureMeasurement().fromJSON(DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT)
                assert.propertyVal(result, 'value', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.device_id)

            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BodyTemperatureMeasurement = new BodyTemperatureMeasurement().fromJSON({})
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BodyTemperatureMeasurement =
                    new BodyTemperatureMeasurement().fromJSON(JSON.stringify(DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT))
                assert.propertyVal(result, 'value', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BodyTemperatureMeasurement = new BodyTemperatureMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: BodyTemperatureMeasurement = new BodyTemperatureMeasurement().fromJSON('invalid')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: BodyTemperatureMeasurement =
                new BodyTemperatureMeasurement().fromJSON(DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT)
            const result = model.toJSON()
            assert.propertyVal(result, 'value', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.value)
            assert.propertyVal(result, 'unit', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.unit)
            assert.propertyVal(result, 'timestamp', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.timestamp)
            assert.propertyVal(result, 'device_id', DefaultEntityMock.BODY_TEMPERATURE_MEASUREMENT.device_id)
        })
    })
})
