import { OdontologicEvaluationRepoModel } from '../../../src/infrastructure/database/schema/odontologic.evaluation.schema'
import { OdontologicEvaluationRepository } from '../../../src/infrastructure/repository/odontologic.evaluation.repository'
import { EntityMapperMock } from '../../mocks/models/entity.mapper.mock'
import { CustomLoggerMock } from '../../mocks/custom.logger.mock'
import { OdontologicEvaluation } from '../../../src/application/domain/model/odontologic.evaluation'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import sinon from 'sinon'
import { Query } from '../../../src/infrastructure/repository/query/query'

require('sinon-mongoose')

describe('Repositories: OdontologicRepository', () => {
    const modelFake: any = OdontologicEvaluationRepoModel
    const repo = new OdontologicEvaluationRepository(modelFake, new EntityMapperMock(), new CustomLoggerMock())
    const evaluation: OdontologicEvaluation = new OdontologicEvaluation().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION)
    evaluation.id = DefaultEntityMock.ODONTOLOGIC_EVALUATION.id

    afterEach(() => {
        sinon.restore()
    })

    describe('create()', () => {
        context('when save a odontologic evaluation', () => {
            it('should return the saved evaluation', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(evaluation)
                    .resolves(evaluation)

                return repo.create(evaluation)
                    .then(res => {
                        assert.propertyVal(res, 'type', evaluation.type)
                        assert.deepPropertyVal(res, 'created_at', evaluation.created_at)
                        assert.propertyVal(res, 'total_patients', evaluation.total_patients)
                        assert.propertyVal(res, 'file_csv', evaluation.file_csv)
                        assert.propertyVal(res, 'file_xls', evaluation.file_xls)
                        assert.propertyVal(res, 'health_professional_id', evaluation.health_professional_id)
                        assert.propertyVal(res, 'pilotstudy_id', evaluation.pilotstudy_id)
                    })
            })
        })

        context('when the odontologic evaluation is not created', () => {
            it('should return undefined', () => {
                it('should return the saved evaluation', () => {
                    sinon
                        .mock(modelFake)
                        .expects('create')
                        .withArgs(evaluation)
                        .resolves(undefined)

                    return repo.create(evaluation)
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
                    .withArgs(evaluation)
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.create(evaluation)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
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
                    .chain('select')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .resolves([evaluation])

                return repo.find(new Query())
                    .then(res => {
                        assert.isArray(res)
                        assert.lengthOf(res, 1)
                        assert.propertyVal(res[0], 'type', evaluation.type)
                        assert.deepPropertyVal(res[0], 'created_at', evaluation.created_at)
                        assert.propertyVal(res[0], 'total_patients', evaluation.total_patients)
                        assert.propertyVal(res[0], 'file_csv', evaluation.file_csv)
                        assert.propertyVal(res[0], 'file_xls', evaluation.file_xls)
                        assert.propertyVal(res[0], 'health_professional_id', evaluation.health_professional_id)
                        assert.propertyVal(res[0], 'pilotstudy_id', evaluation.pilotstudy_id)
                    })
            })
        })

        context('when there no odontologic evaluations', () => {
            it('should return a empty list', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('select')
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
                    .chain('select')
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
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
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
                    .withArgs({ _id: evaluation.id })
                    .chain('select')
                    .chain('exec')
                    .resolves(evaluation)

                return repo.findOne(new Query().fromJSON({ filters: { _id: evaluation.id } }))
                    .then(res => {
                        assert.propertyVal(res, 'type', evaluation.type)
                        assert.deepPropertyVal(res, 'created_at', evaluation.created_at)
                        assert.propertyVal(res, 'total_patients', evaluation.total_patients)
                        assert.propertyVal(res, 'file_csv', evaluation.file_csv)
                        assert.propertyVal(res, 'file_xls', evaluation.file_xls)
                        assert.propertyVal(res, 'health_professional_id', evaluation.health_professional_id)
                        assert.propertyVal(res, 'pilotstudy_id', evaluation.pilotstudy_id)
                    })
            })
        })

        context('when the odontologic evaluation is not found', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: evaluation.id })
                    .chain('select')
                    .chain('exec')
                    .resolves(undefined)

                return repo.findOne(new Query().fromJSON({ filters: { _id: evaluation.id } }))
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
                    .withArgs({ _id: evaluation.id })
                    .chain('select')
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.findOne(new Query().fromJSON({ filters: { _id: evaluation.id } }))
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
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
                    .withArgs({ _id: evaluation.id }, evaluation, { new: true })
                    .chain('exec')
                    .resolves(evaluation)

                return repo.update(evaluation)
                    .then(res => {
                        assert.propertyVal(res, 'type', evaluation.type)
                        assert.deepPropertyVal(res, 'created_at', evaluation.created_at)
                        assert.propertyVal(res, 'total_patients', evaluation.total_patients)
                        assert.propertyVal(res, 'file_csv', evaluation.file_csv)
                        assert.propertyVal(res, 'file_xls', evaluation.file_xls)
                        assert.propertyVal(res, 'health_professional_id', evaluation.health_professional_id)
                        assert.propertyVal(res, 'pilotstudy_id', evaluation.pilotstudy_id)
                    })
            })
        })

        context('when the odontologic evaluation is not updated', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: evaluation.id }, evaluation, { new: true })
                    .chain('exec')
                    .resolves(undefined)

                return repo.update(evaluation)
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
                    .withArgs({ _id: evaluation.id }, evaluation, { new: true })
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.update(evaluation)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
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
                    .withArgs({ _id: evaluation.id })
                    .chain('exec')
                    .resolves(true)

                return repo.delete(evaluation.id!)
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
                    .withArgs({ _id: evaluation.id })
                    .chain('exec')
                    .resolves(false)

                return repo.delete(evaluation.id!)
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
                    .withArgs({ _id: evaluation.id })
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.delete(evaluation.id!)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })
})
