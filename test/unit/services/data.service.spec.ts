import { DataRepositoryMock } from '../../mocks/repositories/data.repository.mock'
import { Query } from '../../../src/infrastructure/repository/query/query'
import { DataService } from '../../../src/application/service/data.service'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { AwsFilesRepositoryMock } from '../../mocks/repositories/aws.files.repository.mock'
import { CustomLoggerMock } from '../../mocks/custom.logger.mock'
import { Data } from '../../../src/application/domain/model/data'
import { assert } from 'chai'
import { DataRequestParameters } from '../../../src/application/domain/model/data.request.parameters'

describe('Services: DataService', () => {
    const data: Data = new Data().fromJSON(DefaultEntityMock.DATA)
    data.id = DefaultEntityMock.DATA.id
    const service = new DataService(new DataRepositoryMock(), new AwsFilesRepositoryMock(), new CustomLoggerMock())

    describe('add', () => {
        context('when save a new odontologic evaluation', () => {
            it('should return the saved evaluation', () => {
                return service.add(data)
                    .then(res => {
                        assert.deepPropertyVal(res, 'created_at', data.created_at)
                        assert.propertyVal(res, 'total_patients', data.total_patients)
                        assert.propertyVal(res, 'file_csv', data.file_csv)
                        assert.propertyVal(res, 'file_xls', data.file_xls)
                        assert.propertyVal(res, 'pilotstudy_id', data.pilotstudy_id)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should throw an error for invalid parameters', () => {
                return service.add(new Data())
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Data Request validation: total_patients, file_csv,' +
                            ' file_xls, pilotstudy_id required!')
                    })
            })
        })

    })

    describe('getAll()', () => {
        context('when get all odontologic evaluations', () => {
            it('should return a list of evaluations', () => {
                return service.getAll(new Query())
                    .then(res => {
                        assert.isArray(res)
                        assert.lengthOf(res, 1)
                        assert.deepPropertyVal(res[0], 'created_at', data.created_at)
                        assert.propertyVal(res[0], 'total_patients', data.total_patients)
                        assert.propertyVal(res[0], 'file_csv', data.file_csv)
                        assert.propertyVal(res[0], 'file_xls', data.file_xls)
                        assert.propertyVal(res[0], 'pilotstudy_id', data.pilotstudy_id)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should throw an error for invalid parameters', () => {
                return service.getAll(new Query().fromJSON({ filters: { pilotstudy_id: '123' } }))
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is ' +
                            'expected.')
                    })
            })
        })
    })

    describe('getById()', () => {
        it('should throw an error for method not implemented', () => {
            try {
                return service.getById('', new Query())
            } catch (err) {
                assert.propertyVal(err, 'message', 'Not implemented!')
            }
        })
    })

    describe('remove()', () => {
        it('should throw an error for method not implemented', () => {
            try {
                return service.remove('')
            } catch (err) {
                assert.propertyVal(err, 'message', 'Not implemented!')
            }
        })
    })

    describe('update()', () => {
        it('should throw an error for method not implemented', () => {
            try {
                return service.update(new Data())
            } catch (err) {
                assert.propertyVal(err, 'message', 'Not implemented!')
            }
        })
    })

    describe('count()', () => {
        it('should return the quantity of data', () => {
            return service.count(new Query())
                .then(res => {
                    assert.isNumber(res)
                    assert.equal(res, 1)
                })
        })
    })

    describe('requestData()', () => {
        context('when request data file', () => {
            it('should return status and estimate for finish request', () => {
                return service.requestData(
                    data.pilotstudy_id!,
                    new DataRequestParameters().fromJSON({ data_types: ['all'], patients: 'any' }))
                    .then(res => {
                        assert.propertyVal(res, 'status', 'pending')
                        assert.property(res, 'completion_estimate')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject an error for does pass incomplete data request params', () => {
                return service.requestData(data.pilotstudy_id!, new DataRequestParameters())
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'You must select at least one data type to request data ' +
                            'from a pilot study.')
                    })
            })
        })
    })
})
