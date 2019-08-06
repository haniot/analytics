import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { Measurement } from '../../../src/application/domain/model/measurement'

describe('Models: Measurement', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Measurement = new Measurement().fromJSON(DefaultEntityMock.MEASUREMENT)
                assert.propertyVal(result, 'unit', DefaultEntityMock.MEASUREMENT.unit)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Measurement = new Measurement().fromJSON({})
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Measurement = new Measurement().fromJSON(JSON.stringify(DefaultEntityMock.MEASUREMENT))
                assert.propertyVal(result, 'unit', DefaultEntityMock.MEASUREMENT.unit)
                assert.propertyVal(result, 'device_id', DefaultEntityMock.MEASUREMENT.device_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Measurement = new Measurement().fromJSON('')
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: Measurement = new Measurement().fromJSON('')
                assert.propertyVal(result, 'unit', undefined)
                assert.propertyVal(result, 'device_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: Measurement = new Measurement().fromJSON(DefaultEntityMock.MEASUREMENT)
            const result = model.toJSON()
            assert.propertyVal(result, 'unit', DefaultEntityMock.MEASUREMENT.unit)
            assert.propertyVal(result, 'device_id', DefaultEntityMock.MEASUREMENT.device_id)
        })
    })
})
