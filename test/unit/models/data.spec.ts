import { Data } from '../../../src/application/domain/model/data'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: Data', () => {
    const data: Data = new Data().fromJSON(DefaultEntityMock.DATA)

    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Data = new Data().fromJSON(DefaultEntityMock.DATA)
                assert.propertyVal(result, 'total_patients', data.total_patients)
                assert.propertyVal(result, 'file_csv', data.file_csv)
                assert.propertyVal(result, 'file_xls', data.file_xls)
                assert.deepPropertyVal(result, 'pilotstudy_id', data.pilotstudy_id)
                assert.deepPropertyVal(result, 'patients', data.patients)
                assert.deepPropertyVal(result, 'data_types', data.data_types)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Data = new Data().fromJSON({})
                assert.propertyVal(result, 'total_patients', undefined)
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.propertyVal(result, 'patients', undefined)
                assert.propertyVal(result, 'data_types', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Data = new Data().fromJSON(JSON.stringify(DefaultEntityMock.DATA))
                assert.propertyVal(result, 'total_patients', data.total_patients)
                assert.propertyVal(result, 'file_csv', data.file_csv)
                assert.propertyVal(result, 'file_xls', data.file_xls)
                assert.deepPropertyVal(result, 'pilotstudy_id', data.pilotstudy_id)
                assert.deepPropertyVal(result, 'patients', data.patients)
                assert.deepPropertyVal(result, 'data_types', data.data_types)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Data = new Data().fromJSON('')
                assert.propertyVal(result, 'total_patients', undefined)
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.propertyVal(result, 'patients', undefined)
                assert.propertyVal(result, 'data_types', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: Data = new Data().fromJSON('invalid')
                assert.propertyVal(result, 'total_patients', undefined)
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.propertyVal(result, 'patients', undefined)
                assert.propertyVal(result, 'data_types', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const result = data.toJSON()
            assert.propertyVal(result, 'total_patients', data.total_patients)
            assert.propertyVal(result, 'file_csv', data.file_csv)
            assert.propertyVal(result, 'file_xls', data.file_xls)
            assert.deepPropertyVal(result, 'pilotstudy_id', data.pilotstudy_id)
            assert.deepPropertyVal(result, 'patients', data.patients)
            assert.deepPropertyVal(result, 'data_types', data.data_types)
        })

        context('when the parameters are undefined', () => {
            it('should return a json with undefined parameters', () => {
                const result = new Data().toJSON()
                assert.propertyVal(result, 'total_patients', undefined)
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.propertyVal(result, 'patients', undefined)
                assert.propertyVal(result, 'data_types', undefined)
            })
        })
    })
})
