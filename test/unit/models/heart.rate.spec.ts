import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { HeartRate } from '../../../src/application/domain/model/heart.rate'

describe('Models: HeartRate', () => {
    const data: HeartRate = new HeartRate().fromJSON(DefaultEntityMock.HEART_RATE)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: HeartRate = new HeartRate().fromJSON(DefaultEntityMock.HEART_RATE)
                assert.deepPropertyVal(result, 'dataset', data.dataset)
                assert.propertyVal(result, 'min', data.min)
                assert.propertyVal(result, 'max', data.max)
                assert.propertyVal(result, 'average', data.average)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: HeartRate = new HeartRate().fromJSON({})
                assert.deepPropertyVal(result, 'dataset', undefined)
                assert.propertyVal(result, 'min', undefined)
                assert.propertyVal(result, 'max', undefined)
                assert.propertyVal(result, 'average', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: HeartRate =
                    new HeartRate().fromJSON(JSON.stringify(DefaultEntityMock.HEART_RATE))
                assert.deepPropertyVal(result, 'dataset', data.dataset)
                assert.propertyVal(result, 'min', data.min)
                assert.propertyVal(result, 'max', data.max)
                assert.propertyVal(result, 'average', data.average)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: HeartRate = new HeartRate().fromJSON('')
                assert.deepPropertyVal(result, 'dataset', undefined)
                assert.propertyVal(result, 'min', undefined)
                assert.propertyVal(result, 'max', undefined)
                assert.propertyVal(result, 'average', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: HeartRate = new HeartRate().fromJSON('invalid')
                assert.deepPropertyVal(result, 'dataset', undefined)
                assert.propertyVal(result, 'min', undefined)
                assert.propertyVal(result, 'max', undefined)
                assert.propertyVal(result, 'average', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const result = data.toJSON()
            assert.deepPropertyVal(result, 'dataset', DefaultEntityMock.HEART_RATE.dataset)
            assert.propertyVal(result, 'min', DefaultEntityMock.HEART_RATE.min)
            assert.propertyVal(result, 'max', DefaultEntityMock.HEART_RATE.max)
            assert.propertyVal(result, 'average', DefaultEntityMock.HEART_RATE.average)
        })
    })
})
