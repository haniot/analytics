import { OdontologicEvaluation } from '../../../src/application/domain/model/odontologic.evaluation'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { OdontologicEvaluationService } from '../../../src/application/service/odontologic.evaluation.service'
import { OdontologicEvaluationRepositoryMock } from '../../mocks/repositories/odontologic.evaluation.repository.mock'
import { AwsFilesRepositoryMock } from '../../mocks/repositories/aws.files.repository.mock'
import { assert } from 'chai'
import { Query } from '../../../src/infrastructure/repository/query/query'

describe('Services: OdontologicService', () => {
    const evaluation: OdontologicEvaluation = new OdontologicEvaluation().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION)
    evaluation.id = DefaultEntityMock.ODONTOLOGIC_EVALUATION.id

    const service = new OdontologicEvaluationService(
        new OdontologicEvaluationRepositoryMock(),
        new AwsFilesRepositoryMock()
    )

    describe('add', () => {
        context('when save a new odontologic evaluation', () => {
            it('should return the saved evaluation', () => {
                return service.add(evaluation)
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

        context('when there are validation errors', () => {
            it('should throw an error for invalid parameters', () => {
                return service.add(new OdontologicEvaluation())
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Nutritional Evaluation validation: total_patients, file_csv, ' +
                            'file_xls, health_professional_id, pilotstudy_id required!')
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
        context('when get a unique odontologic evaluation', () => {
            it('should return the evaluation', () => {
                return service.getById(evaluation.id!, new Query())
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

        context('when there are validation errors', () => {
            it('should throw an error for invalid id', () => {
                return service.getById('123', new Query().fromJSON({ filters: { pilotstudy_id: evaluation.pilotstudy_id } }))
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is ' +
                            'expected.')
                    })
            })
            it('should throw an error for invalid parameters', () => {
                return service.getById(evaluation.id!, new Query().fromJSON({ filters: { pilotstudy_id: '123' } }))
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is ' +
                            'expected.')
                    })
            })
        })
    })

    describe('remove()', () => {
        it('should throw an error for not implemented', () => {
            try {
                return service.remove(evaluation.id!).then()
            } catch (err) {
                assert.propertyVal(err, 'message', 'Not implemented!')
            }
        })
    })

    describe('update()', () => {
        it('should throw an error for not implemented', () => {
            try {
                return service.update(evaluation).then()
            } catch (err) {
                assert.propertyVal(err, 'message', 'Not implemented!')
            }
        })
    })
})
