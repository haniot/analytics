import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { HeightMeasurement } from '../../../src/application/domain/model/height.measurement'
import { assert } from 'chai'

describe('Models: HeightMeasurement', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: HeightMeasurement = new HeightMeasurement().fromJSON(DefaultEntityMock.HEIGHT_MEASUREMENT)
                assert.propertyVal(result, 'value', DefaultEntityMock.HEIGHT_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.HEIGHT_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.HEIGHT_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.HEIGHT_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: HeightMeasurement = new HeightMeasurement().fromJSON({})
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: HeightMeasurement =
                    new HeightMeasurement().fromJSON(JSON.stringify(DefaultEntityMock.HEIGHT_MEASUREMENT))
                assert.propertyVal(result, 'value', DefaultEntityMock.HEIGHT_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.HEIGHT_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.HEIGHT_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.HEIGHT_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: HeightMeasurement = new HeightMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: HeightMeasurement = new HeightMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: HeightMeasurement = new HeightMeasurement().fromJSON(DefaultEntityMock.HEIGHT_MEASUREMENT)
            const result = model.toJSON()
            assert.propertyVal(result, 'value', DefaultEntityMock.HEIGHT_MEASUREMENT.value)
            assert.propertyVal(result, 'unit', DefaultEntityMock.HEIGHT_MEASUREMENT.unit)
            assert.propertyVal(result, 'timestamp', DefaultEntityMock.HEIGHT_MEASUREMENT.timestamp)
            assert.propertyVal(result, 'device_id', DefaultEntityMock.HEIGHT_MEASUREMENT.device_id)
        })
    })
})
