import { FatMeasurement } from '../../../src/application/domain/model/fat.measurement'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: FatMeasurement', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: FatMeasurement = new FatMeasurement().fromJSON(DefaultEntityMock.FAT_MEASUREMENT)
                assert.propertyVal(result, 'value', DefaultEntityMock.FAT_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.FAT_MEASUREMENT.unit)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.FAT_MEASUREMENT.device_id)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.FAT_MEASUREMENT.timestamp)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: FatMeasurement = new FatMeasurement().fromJSON({})
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'device_id', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: FatMeasurement = new FatMeasurement().fromJSON(JSON.stringify(DefaultEntityMock.FAT_MEASUREMENT))
                assert.propertyVal(result, 'value', DefaultEntityMock.FAT_MEASUREMENT.value)
                assert.propertyVal(result, 'unit', DefaultEntityMock.FAT_MEASUREMENT.unit)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.FAT_MEASUREMENT.device_id)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.FAT_MEASUREMENT.timestamp)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: FatMeasurement = new FatMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'device_id', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: FatMeasurement = new FatMeasurement().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'device_id', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: FatMeasurement = new FatMeasurement().fromJSON(DefaultEntityMock.FAT_MEASUREMENT)
            const result = model.toJSON()
            assert.propertyVal(result, 'value', DefaultEntityMock.FAT_MEASUREMENT.value)
            assert.propertyVal(result, 'unit', DefaultEntityMock.FAT_MEASUREMENT.unit)
            assert.propertyVal(result, 'device_id', DefaultEntityMock.FAT_MEASUREMENT.device_id)
            assert.propertyVal(result, 'timestamp', DefaultEntityMock.FAT_MEASUREMENT.timestamp)
        })
    })
})
