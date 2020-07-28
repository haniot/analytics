import { EntityMapperMock } from '../../mocks/models/entity.mapper.mock'
import { CustomLoggerMock } from '../../mocks/custom.logger.mock'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import sinon from 'sinon'
import { NutritionEvaluationRepoModel } from '../../../src/infrastructure/database/schema/nutrition.evaluation.schema'
import { NutritionEvaluationRepository } from '../../../src/infrastructure/repository/nutrition.evaluation.repository'
import { NutritionEvaluation } from '../../../src/application/domain/model/nutrition.evaluation'
import { Query } from '../../../src/infrastructure/repository/query/query'
import { NutritionEvaluationStatusTypes } from '../../../src/application/domain/utils/nutrition.evaluation.status.types'

require('sinon-mongoose')

const evaluation: NutritionEvaluation = new NutritionEvaluation().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION)
evaluation.id = DefaultEntityMock.NUTRITION_EVALUATION.id

describe('Repositories: NutritionRepository', () => {
    const modelFake: any = NutritionEvaluationRepoModel
    const repo = new NutritionEvaluationRepository(modelFake, new EntityMapperMock(), new CustomLoggerMock())

    afterEach(() => {
        sinon.restore()
    })

    describe('create()', () => {
        context('when save a nutrition evaluation', () => {
            it('should return the saved evaluation', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(evaluation)
                    .resolves(evaluation)

                return repo.create(evaluation)
                    .then(res => validate(res))
            })
        })

        context('when the nutrition evaluation is not created', () => {
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
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('find()', () => {
        context('when get all nutrition evaluations', () => {
            it('should return a list of evaluations', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('sort')
                    .withArgs({ created_at: -1 })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .resolves([evaluation])

                return repo.find(new Query())
                    .then(res => validateList(res))
            })
        })

        context('when there no nutrition evaluations', () => {
            it('should return a empty list', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('sort')
                    .withArgs({ created_at: -1 })
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
                    .withArgs({ created_at: -1 })
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
        context('when get a unique nutrition evaluation', () => {
            it('should return the evaluation', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: evaluation.id })
                    .chain('exec')
                    .resolves(evaluation)

                return repo.findOne(new Query().fromJSON({ filters: { _id: evaluation.id } }))
                    .then(res => validate(res))
            })
        })

        context('when the nutrition evaluation is not found', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: evaluation.id })
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
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.findOne(new Query().fromJSON({ filters: { _id: evaluation.id } }))
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('update()', () => {
        context('when update a nutrition evaluation', () => {
            it('should return the updated evaluation', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: evaluation.id }, evaluation, { new: true })
                    .chain('exec')
                    .resolves(evaluation)

                return repo.update(evaluation)
                    .then(res => validate(res))
            })
        })

        context('when the nutrition evaluation is not updated', () => {
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
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('delete()', () => {
        context('when delete a nutrition evaluation', () => {
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

        context('when the nutrition evaluation is not deleted', () => {
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
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('updateNutritionalCounseling()', () => {
        context('when update a definitive nutritional counseling', () => {
            it('should return a nutritional evaluation', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs(
                        { _id: evaluation.id },
                        {
                            $set: {
                                'counseling.definitive': DefaultEntityMock.NUTRITION_EVALUATION.counseling.definitive,
                                'status': NutritionEvaluationStatusTypes.COMPLETE
                            }
                        },
                        { new: true })
                    .resolves(evaluation)

                return repo.updateNutritionalCounseling(evaluation.patient!.id!, evaluation.id!, evaluation.counseling!.definitive!)
                    .then(res => {
                        validate(res)
                    })
            })
        })

        context('when the nutrition evaluation is not updated', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs(
                        { _id: evaluation.id },
                        {
                            $set: {
                                'counseling.definitive': DefaultEntityMock.NUTRITION_EVALUATION.counseling.definitive,
                                'status': NutritionEvaluationStatusTypes.COMPLETE
                            }
                        },
                        { new: true })
                    .resolves(undefined)

                return repo.updateNutritionalCounseling(evaluation.patient!.id!, evaluation.id!, evaluation.counseling!.definitive!)
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
                    .withArgs(
                        { _id: evaluation.id },
                        {
                            $set: {
                                'counseling.definitive': DefaultEntityMock.NUTRITION_EVALUATION.counseling.definitive,
                                'status': NutritionEvaluationStatusTypes.COMPLETE
                            }
                        },
                        { new: true })
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.updateNutritionalCounseling(evaluation.patient!.id!, evaluation.id!, evaluation.counseling!.definitive!)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })
})

function validate(res) {
    assert.propertyVal(res, 'type', evaluation.type)
    assert.deepPropertyVal(res, 'created_at', evaluation.created_at)
    assert.deepPropertyVal(res, 'patient', evaluation.patient)
    assert.deepPropertyVal(res, 'nutritional_status', evaluation.nutritional_status)
    assert.deepPropertyVal(res, 'overweight_indicator', evaluation.overweight_indicator)
    assert.deepPropertyVal(res, 'taylor_cut_point', evaluation.taylor_cut_point)
    assert.deepPropertyVal(res, 'taylor_cut_point', evaluation.taylor_cut_point)
    assert.deepPropertyVal(res, 'blood_glucose', evaluation.blood_glucose)
    assert.deepPropertyVal(res, 'blood_pressure', evaluation.blood_pressure)
    assert.deepPropertyVal(res, 'counseling', evaluation.counseling)
    assert.deepPropertyVal(res, 'physical_activity_habits', evaluation.physical_activity_habits)
    assert.deepPropertyVal(res, 'feeding_habits_record', evaluation.feeding_habits_record)
    assert.deepPropertyVal(res, 'medical_record', evaluation.medical_record)
}

function validateList(res) {
    assert.isArray(res)
    assert.lengthOf(res, 1)
    assert.propertyVal(res[0], 'type', evaluation.type)
    assert.deepPropertyVal(res[0], 'created_at', evaluation.created_at)
    assert.deepPropertyVal(res[0], 'patient', evaluation.patient)
    assert.deepPropertyVal(res[0], 'nutritional_status', evaluation.nutritional_status)
    assert.deepPropertyVal(res[0], 'overweight_indicator', evaluation.overweight_indicator)
    assert.deepPropertyVal(res[0], 'taylor_cut_point', evaluation.taylor_cut_point)
    assert.deepPropertyVal(res[0], 'taylor_cut_point', evaluation.taylor_cut_point)
    assert.deepPropertyVal(res[0], 'blood_glucose', evaluation.blood_glucose)
    assert.deepPropertyVal(res[0], 'blood_pressure', evaluation.blood_pressure)
    assert.deepPropertyVal(res[0], 'counseling', evaluation.counseling)
    assert.deepPropertyVal(res[0], 'physical_activity_habits', evaluation.physical_activity_habits)
    assert.deepPropertyVal(res[0], 'feeding_habits_record', evaluation.feeding_habits_record)
    assert.deepPropertyVal(res[0], 'medical_record', evaluation.medical_record)
}
