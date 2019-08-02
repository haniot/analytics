import { BaseRepository } from '../../../src/infrastructure/repository/base/base.repository'
import Mongoose from 'mongoose'
import { EntityMapperMock } from '../../mocks/models/entity.mapper.mock'
import { CustomLoggerMock } from '../../mocks/custom.logger.mock'
import sinon from 'sinon'
import { assert } from 'chai'
import { IEntityMapper } from '../../../src/infrastructure/port/entity.mapper.interface'
import { ILogger } from '../../../src/utils/custom.logger'
import { Entity } from '../../../src/application/domain/model/entity'
import { Query } from '../../../src/infrastructure/repository/query/query'

require('sinon-mongoose')

class FakeRepository<T extends Entity, TModel> extends BaseRepository<any, any> {
    constructor(
        readonly userModel: any,
        readonly userMapper: IEntityMapper<T, TModel>,
        readonly logger: ILogger
    ) {
        super(userModel, userMapper, logger)
    }
}

const modelFake = Mongoose.model('FakeModel', new Mongoose.Schema({ name: String }))

describe('Repositories: BaseRepository', () => {
    const repo = new FakeRepository(
        modelFake,
        new EntityMapperMock(),
        new CustomLoggerMock()
    )

    afterEach(() => {
        sinon.restore()
    })

    describe('mongoDBErrorListener()', () => {
        context('when a validation error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .rejects({ name: 'ValidationError', message: 'A validation error occurs!' })

                return repo.count(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'Required fields were not provided!')
                        assert.propertyVal(err, 'description', 'A validation error occurs!')
                    })
            })
        })

        context('when a cast error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .rejects({ name: 'CastError', message: 'A validation error occurs!' })

                return repo.count(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'The given ID is in invalid format.')
                        assert.propertyVal(err, 'description', 'A 12 bytes hexadecimal ID similar to this')
                    })
            })
        })

        context('when a conflict error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs({})
                    .rejects({ name: 'MongoError', code: 11000 })

                return repo.create({})
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'A registration with the same unique data already exists!')
                    })
            })
        })

        context('when a object parameters error occurs', () => {
            it('should reject a error', () => {
                it('should reject a error', () => {
                    sinon
                        .mock(modelFake)
                        .expects('findOne')
                        .withArgs({ _id:  '123' })
                        .chain('exec')
                        .rejects({ name: 'ObjectParameterError' })

                    return repo.findOne(new Query())
                        .catch(err => {
                            assert.propertyVal(err, 'message', 'Invalid query parameters!')
                        })
                })
            })
        })
    })

    describe('count()', () => {
        context('when get a number of documents', () => {
            it('should return the number of documents', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .resolves(1)

                return repo.count(new Query())
                    .then(res => {
                        assert.isNumber(res)
                        assert.equal(res, 1)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.count(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })
})
