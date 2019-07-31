import { Data } from '../../../src/application/domain/model/data'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: Data', () => {
    const data: Data = new Data().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION)

    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Data =
                    new Data().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION)
                assert.propertyVal(result, 'file_csv', data.file_csv)
                assert.propertyVal(result, 'file_xls', data.file_xls)
                assert.deepPropertyVal(result, 'created_at', data.created_at)
                assert.propertyVal(result, 'total_patients', data.total_patients)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Data = new Data().fromJSON({})
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.deepPropertyVal(result, 'created_at', undefined)
                assert.propertyVal(result, 'total_patients', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Data =
                    new Data().fromJSON(JSON.stringify(DefaultEntityMock.ODONTOLOGIC_EVALUATION))
                assert.propertyVal(result, 'file_csv', data.file_csv)
                assert.propertyVal(result, 'file_xls', data.file_xls)
                assert.deepPropertyVal(result, 'created_at', data.created_at)
                assert.propertyVal(result, 'total_patients', data.total_patients)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Data = new Data().fromJSON('')
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.deepPropertyVal(result, 'created_at', undefined)
                assert.propertyVal(result, 'total_patients', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: Data = new Data().fromJSON('invalid')
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.deepPropertyVal(result, 'created_at', undefined)
                assert.propertyVal(result, 'total_patients', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const result = data.toJSON()
            assert.propertyVal(result, 'file_csv', DefaultEntityMock.ODONTOLOGIC_EVALUATION.file_csv)
            assert.propertyVal(result, 'file_xls', DefaultEntityMock.ODONTOLOGIC_EVALUATION.file_xls)
            assert.deepPropertyVal(result, 'created_at', data.created_at)
            assert.propertyVal(result, 'total_patients', DefaultEntityMock.ODONTOLOGIC_EVALUATION.total_patients)
        })
    })
})
