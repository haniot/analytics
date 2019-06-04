import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { WeightMeasurement } from '../../../src/application/domain/model/weight.measurement'

describe('Models: WeightMeasurement', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: WeightMeasurement = new WeightMeasurement().fromJSON(DefaultEntityMock.WEIGHT_MEASUREMENT)
                assert.propertyVal(result, 'value', DefaultEntityMock.WEIGHT_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.WEIGHT_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.WEIGHT_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.WEIGHT_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: WeightMeasurement = new WeightMeasurement().fromJSON({})
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: WeightMeasurement =
                    new WeightMeasurement().fromJSON(JSON.stringify(DefaultEntityMock.WEIGHT_MEASUREMENT))
                assert.propertyVal(result, 'value', DefaultEntityMock.WEIGHT_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.WEIGHT_MEASUREMENT.unit)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.WEIGHT_MEASUREMENT.timestamp)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.WEIGHT_MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: WeightMeasurement = new WeightMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: WeightMeasurement = new WeightMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: WeightMeasurement = new WeightMeasurement().fromJSON(DefaultEntityMock.WEIGHT_MEASUREMENT)
            const result = model.toJSON()
            assert.propertyVal(result, 'value', DefaultEntityMock.WEIGHT_MEASUREMENT.value)
            assert.propertyVal(result, 'unit', DefaultEntityMock.WEIGHT_MEASUREMENT.unit)
            assert.propertyVal(result, 'timestamp', DefaultEntityMock.WEIGHT_MEASUREMENT.timestamp)
            assert.propertyVal(result, 'device_id', DefaultEntityMock.WEIGHT_MEASUREMENT.device_id)
        })
    })
})
