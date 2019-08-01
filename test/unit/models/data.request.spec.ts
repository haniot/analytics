import { DataRequestParameters } from '../../../src/application/domain/model/data.request.parameters'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: DataRequestParameters', () => {
    const data: DataRequestParameters = new DataRequestParameters().fromJSON(DefaultEntityMock.DATA_REQUEST)

    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: DataRequestParameters =
                    new DataRequestParameters().fromJSON(DefaultEntityMock.DATA_REQUEST)
                assert.deepPropertyVal(result, 'patients', data.patients)
                assert.deepPropertyVal(result, 'data_types', data.data_types)

            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: DataRequestParameters = new DataRequestParameters().fromJSON({})
                assert.deepPropertyVal(result, 'patients', undefined)
                assert.deepPropertyVal(result, 'data_types', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: DataRequestParameters =
                    new DataRequestParameters().fromJSON(JSON.stringify(DefaultEntityMock.DATA_REQUEST))
                assert.deepPropertyVal(result, 'patients', data.patients)
                assert.deepPropertyVal(result, 'data_types', data.data_types)
            })

            it('should return a incomplete model for not pass parameters', () => {
                const result: DataRequestParameters = new DataRequestParameters().fromJSON('')
                assert.deepPropertyVal(result, 'patients', undefined)
                assert.deepPropertyVal(result, 'data_types', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: DataRequestParameters = new DataRequestParameters().fromJSON('invalid')
                assert.deepPropertyVal(result, 'patients', undefined)
                assert.deepPropertyVal(result, 'data_types', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: DataRequestParameters = new DataRequestParameters().fromJSON(DefaultEntityMock.DATA_REQUEST)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'patients', DefaultEntityMock.DATA_REQUEST.patients)
            assert.deepPropertyVal(result, 'data_types', DefaultEntityMock.DATA_REQUEST.data_types)
        })
    })
})
