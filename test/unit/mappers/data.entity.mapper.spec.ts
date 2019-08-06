import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { DataEntity } from '../../../src/infrastructure/entity/data.entity'
import { DataEntityMapper } from '../../../src/infrastructure/entity/mapper/data.entity.mapper'
import { assert } from 'chai'
import { Data } from '../../../src/application/domain/model/data'

describe('Mappers: Data', () => {

    const mapper = new DataEntityMapper()
    const model: Data = new Data().fromJSON(DefaultEntityMock.DATA)
    model.id = DefaultEntityMock.DATA.id

    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                validate(mapper.transform(DefaultEntityMock.DATA))
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                delete result._id
                assert.isEmpty(result)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                delete result._id
                assert.isEmpty(result)
            })
        })

        context('when the parameter is a model', () => {
            it('should call the modelToModelEntity() method', () => {
                validate(mapper.transform(model))
            })

            it('should return a model entity with basic parameters for empty model', () => {
                const result = mapper.transform(new Data())
                assert.isEmpty(result)

            })
        })
    })

    describe('modelEntityToModel()', () => {
        context('when try to use modelEntityToModel() function', () => {
            it('should throw an error', () => {
                try {
                    mapper.modelEntityToModel(new DataEntity())
                } catch (err) {
                    assert.property(err, 'message')
                    assert.propertyVal(err, 'message', 'Not implemented!')
                }
            })
        })
    })
})

function validate(model) {
    assert.propertyVal(model, 'id', DefaultEntityMock.DATA.id)
    assert.propertyVal(model, 'total_patients', DefaultEntityMock.DATA.total_patients)
    assert.propertyVal(model, 'file_csv', DefaultEntityMock.DATA.file_csv)
    assert.propertyVal(model, 'file_xls', DefaultEntityMock.DATA.file_xls)
    assert.propertyVal(model, 'pilotstudy_id', DefaultEntityMock.DATA.pilotstudy_id)
    assert.deepPropertyVal(model, 'patients', DefaultEntityMock.DATA.patients)
    assert.deepPropertyVal(model, 'data_types', DefaultEntityMock.DATA.data_types)
}
