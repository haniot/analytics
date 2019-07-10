import { Zone } from '../../../src/application/domain/model/zone'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: Zone', () => {
    const data: Zone = new Zone().fromJSON(DefaultEntityMock.ZONE)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Zone = new Zone().fromJSON(DefaultEntityMock.ZONE)
                assert.deepPropertyVal(result, 'bedtime', data.bedtime)
                assert.deepPropertyVal(result, 'glycated_hemoglobin', data.glycated_hemoglobin)
                assert.deepPropertyVal(result, 'postprandial', data.postprandial)
                assert.deepPropertyVal(result, 'preprandial', data.preprandial)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Zone = new Zone().fromJSON({})
                assert.deepPropertyVal(result, 'bedtime', undefined)
                assert.deepPropertyVal(result, 'glycated_hemoglobin', undefined)
                assert.deepPropertyVal(result, 'postprandial', undefined)
                assert.deepPropertyVal(result, 'preprandial', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Zone = new Zone().fromJSON(JSON.stringify(DefaultEntityMock.ZONE))
                assert.deepPropertyVal(result, 'bedtime', data.bedtime)
                assert.deepPropertyVal(result, 'glycated_hemoglobin', data.glycated_hemoglobin)
                assert.deepPropertyVal(result, 'postprandial', data.postprandial)
                assert.deepPropertyVal(result, 'preprandial', data.preprandial)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Zone = new Zone().fromJSON('')
                assert.deepPropertyVal(result, 'bedtime', undefined)
                assert.deepPropertyVal(result, 'glycated_hemoglobin', undefined)
                assert.deepPropertyVal(result, 'postprandial', undefined)
                assert.deepPropertyVal(result, 'preprandial', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: Zone = new Zone().fromJSON('invalid')
                assert.deepPropertyVal(result, 'bedtime', undefined)
                assert.deepPropertyVal(result, 'glycated_hemoglobin', undefined)
                assert.deepPropertyVal(result, 'postprandial', undefined)
                assert.deepPropertyVal(result, 'preprandial', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: Zone = new Zone().fromJSON(DefaultEntityMock.ZONE)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'bedtime', DefaultEntityMock.ZONE.bedtime)
            assert.deepPropertyVal(result, 'glycated_hemoglobin', DefaultEntityMock.ZONE.glycated_hemoglobin)
            assert.deepPropertyVal(result, 'postprandial', DefaultEntityMock.ZONE.postprandial)
            assert.deepPropertyVal(result, 'preprandial', DefaultEntityMock.ZONE.preprandial)
        })
    })
})
