import { DataSetItem } from '../../../src/application/domain/model/data.set.item'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: DataSetItem', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: DataSetItem = new DataSetItem().fromJSON(DefaultEntityMock.DATA_SET_ITEM)
                assert.propertyVal(result, 'value', DefaultEntityMock.DATA_SET_ITEM.value)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.DATA_SET_ITEM.timestamp)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: DataSetItem = new DataSetItem().fromJSON({})
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: DataSetItem = new DataSetItem().fromJSON(JSON.stringify(DefaultEntityMock.DATA_SET_ITEM))
                assert.propertyVal(result, 'value', DefaultEntityMock.DATA_SET_ITEM.value)
                assert.propertyVal(result, 'timestamp', DefaultEntityMock.DATA_SET_ITEM.timestamp)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: DataSetItem = new DataSetItem().fromJSON('')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: DataSetItem = new DataSetItem().fromJSON('invalid')
                assert.propertyVal(result, 'value', undefined)
                assert.propertyVal(result, 'timestamp', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: DataSetItem = new DataSetItem().fromJSON(DefaultEntityMock.DATA_SET_ITEM)
            const result = model.toJSON()
            assert.propertyVal(result, 'value', DefaultEntityMock.DATA_SET_ITEM.value)
            assert.propertyVal(result, 'timestamp', DefaultEntityMock.DATA_SET_ITEM.timestamp)
        })
    })
})
