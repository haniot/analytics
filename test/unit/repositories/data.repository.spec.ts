import { DataRepoModel } from '../../../src/infrastructure/database/schema/data.schema'
import { DataRepository } from '../../../src/infrastructure/repository/data.repository'
import { EntityMapperMock } from '../../mocks/models/entity.mapper.mock'
import { CustomLoggerMock } from '../../mocks/custom.logger.mock'
import { Data } from '../../../src/application/domain/model/data'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import sinon from 'sinon'
import { Query } from '../../../src/infrastructure/repository/query/query'

require('sinon-mongoose')

describe('Repositories: OdontologicRepository', () => {
    const modelFake: any = DataRepoModel
    const repo = new DataRepository(modelFake, new EntityMapperMock(), new CustomLoggerMock())
    const data: Data = new Data().fromJSON(DefaultEntityMock.DATA)
    data.id = DefaultEntityMock.DATA.id

    afterEach(() => {
        sinon.restore()
    })

    describe('create()', () => {
        context('when save a odontologic evaluation', () => {
            it('should return the saved evaluation', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(data)
                    .resolves(data)

                return repo.create(data)
                    .then(res => {
                        assert.propertyVal(res, 'type', data.type)
                        assert.deepPropertyVal(res, 'created_at', data.created_at)
                        assert.propertyVal(res, 'total_patients', data.total_patients)
                        assert.propertyVal(res, 'file_csv', data.file_csv)
                        assert.propertyVal(res, 'file_xls', data.file_xls)
                        assert.propertyVal(res, 'pilotstudy_id', data.pilotstudy_id)
                    })
            })
        })

        context('when the odontologic evaluation is not created', () => {
            it('should return undefined', () => {
                it('should return the saved evaluation', () => {
                    sinon
                        .mock(modelFake)
                        .expects('create')
                        .withArgs(data)
                        .resolves(undefined)

                    return repo.create(data)
                        .then(res => {
                            assert.isUndefined(res)
                        })
                })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(data)
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.create(data)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('find()', () => {
        context('when get all odontologic evaluations', () => {
            it('should return a list of evaluations', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .resolves([data])

                return repo.find(new Query())
                    .then(res => {
                        assert.isArray(res)
                        assert.lengthOf(res, 1)
                        assert.propertyVal(res[0], 'type', data.type)
                        assert.deepPropertyVal(res[0], 'created_at', data.created_at)
                        assert.propertyVal(res[0], 'total_patients', data.total_patients)
                        assert.propertyVal(res[0], 'file_csv', data.file_csv)
                        assert.propertyVal(res[0], 'file_xls', data.file_xls)
                        assert.propertyVal(res[0], 'pilotstudy_id', data.pilotstudy_id)
                    })
            })
        })

        context('when there no odontologic evaluations', () => {
            it('should return a empty list', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .resolves([])

                return repo.find(new Query())
                    .then(res => {
                        assert.isArray(res)
                        assert.lengthOf(res, 0)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.find(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('findOne()', () => {
        context('when get a unique odontologic evaluation', () => {
            it('should return the evaluation', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: data.id })
                    .chain('exec')
                    .resolves(data)

                return repo.findOne(new Query().fromJSON({ filters: { _id: data.id } }))
                    .then(res => {
                        assert.propertyVal(res, 'type', data.type)
                        assert.deepPropertyVal(res, 'created_at', data.created_at)
                        assert.propertyVal(res, 'total_patients', data.total_patients)
                        assert.propertyVal(res, 'file_csv', data.file_csv)
                        assert.propertyVal(res, 'file_xls', data.file_xls)
                        assert.propertyVal(res, 'pilotstudy_id', data.pilotstudy_id)
                    })
            })
        })

        context('when the odontologic evaluation is not found', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: data.id })
                    .chain('exec')
                    .resolves(undefined)

                return repo.findOne(new Query().fromJSON({ filters: { _id: data.id } }))
                    .then(res => {
                        assert.isUndefined(res)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: data.id })
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.findOne(new Query().fromJSON({ filters: { _id: data.id } }))
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('update()', () => {
        context('when update a odontologic evaluation', () => {
            it('should return the updated evaluation', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: data.id }, data, { new: true })
                    .chain('exec')
                    .resolves(data)

                return repo.update(data)
                    .then(res => {
                        assert.propertyVal(res, 'type', data.type)
                        assert.deepPropertyVal(res, 'created_at', data.created_at)
                        assert.propertyVal(res, 'total_patients', data.total_patients)
                        assert.propertyVal(res, 'file_csv', data.file_csv)
                        assert.propertyVal(res, 'file_xls', data.file_xls)
                        assert.propertyVal(res, 'pilotstudy_id', data.pilotstudy_id)
                    })
            })
        })

        context('when the odontologic evaluation is not updated', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: data.id }, data, { new: true })
                    .chain('exec')
                    .resolves(undefined)

                return repo.update(data)
                    .then(res => {
                        assert.isUndefined(res)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: data.id }, data, { new: true })
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.update(data)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('delete()', () => {
        context('when delete a odontologic evaluation', () => {
            it('should return true', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: data.id })
                    .chain('exec')
                    .resolves(true)

                return repo.delete(data.id!)
                    .then(res => {
                        assert.isBoolean(res)
                        assert.isTrue(res)
                    })
            })
        })

        context('when the odontologic evaluation is not deleted', () => {
            it('should return false', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: data.id })
                    .chain('exec')
                    .resolves(false)

                return repo.delete(data.id!)
                    .then(res => {
                        assert.isBoolean(res)
                        assert.isFalse(res)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: data.id })
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.delete(data.id!)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })
})
