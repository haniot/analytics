import { HeartRateMeasurement } from '../../../src/application/domain/model/heart.rate.measurement'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: HeartRateMeasurement', () => {
    const data: HeartRateMeasurement = new HeartRateMeasurement().fromJSON(DefaultEntityMock.HEART_RATE_MEASUREMENT)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: HeartRateMeasurement = new HeartRateMeasurement().fromJSON(DefaultEntityMock.HEART_RATE_MEASUREMENT)
                assert.deepPropertyVal(result, 'dataset', data.dataset)
                assert.propertyVal(result, 'unit', data.unit)
                assert.propertyVal(result, 'device_id', data.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: HeartRateMeasurement = new HeartRateMeasurement().fromJSON({})
                assert.deepPropertyVal(result, 'dataset', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: HeartRateMeasurement =
                    new HeartRateMeasurement().fromJSON(JSON.stringify(DefaultEntityMock.HEART_RATE_MEASUREMENT))
                assert.deepPropertyVal(result, 'dataset', data.dataset)
                assert.propertyVal(result, 'unit', data.unit)
                assert.propertyVal(result, 'device_id', data.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: HeartRateMeasurement = new HeartRateMeasurement().fromJSON('')
                assert.deepPropertyVal(result, 'dataset', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: HeartRateMeasurement = new HeartRateMeasurement().fromJSON('invalid')
                assert.deepPropertyVal(result, 'dataset', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const result = data.toJSON()
            assert.deepPropertyVal(result, 'dataset', DefaultEntityMock.HEART_RATE_MEASUREMENT.dataset)
            assert.propertyVal(result, 'unit', DefaultEntityMock.HEART_RATE_MEASUREMENT.unit)
            assert.propertyVal(result, 'device_id', DefaultEntityMock.HEART_RATE_MEASUREMENT.device_id)
        })
    })
})
