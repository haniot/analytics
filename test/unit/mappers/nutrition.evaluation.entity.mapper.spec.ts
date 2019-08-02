import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { NutritionEvaluationEntityMapper } from '../../../src/infrastructure/entity/mapper/nutrition.evaluation.entity.mapper'
import { NutritionEvaluationEntity } from '../../../src/infrastructure/entity/nutrition.evaluation.entity'
import { NutritionEvaluation } from '../../../src/application/domain/model/nutrition.evaluation'

const evaluation: NutritionEvaluation = new NutritionEvaluation().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION)
evaluation.id = DefaultEntityMock.NUTRITION_EVALUATION.id

describe('Mappers: NutritionEvaluation', () => {
    const mapper = new NutritionEvaluationEntityMapper()
    const model: NutritionEvaluation = new NutritionEvaluation().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION)
    model.id = DefaultEntityMock.NUTRITION_EVALUATION.id
    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                validate(mapper.transform(DefaultEntityMock.NUTRITION_EVALUATION))
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                delete result._id
                delete result._type
                assert.isEmpty(result)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                delete result._type
                delete result._id
                assert.isEmpty(result)
            })
        })

        context('when the parameter is a model', () => {
            it('should call the modelToModelEntity() method', () => {
                validateModel(mapper.transform(model))
            })

            it('should return a model entity with basic parameters for empty model', () => {
                const object: NutritionEvaluation = new NutritionEvaluation()
                object.type = undefined
                const result = mapper.transform(object)
                delete result.type
                assert.isEmpty(result)
            })
        })
    })

    describe('modelEntityToModel()', () => {
        context('when try to use modelEntityToModel() function', () => {
            it('should throw an error', () => {
                try {
                    mapper.modelEntityToModel(new NutritionEvaluationEntity())
                } catch (err) {
                    assert.property(err, 'message')
                    assert.propertyVal(err, 'message', 'Not implemented!')
                }
            })
        })
    })
})

function validate(model) {
    assert.propertyVal(model, 'id', DefaultEntityMock.NUTRITION_EVALUATION.id)
    assert.propertyVal(model, 'type', evaluation.type)
    assert.deepPropertyVal(model, 'patient', evaluation.patient)
    assert.deepPropertyVal(model, 'nutritional_status', evaluation.nutritional_status)
    assert.deepPropertyVal(model, 'overweight_indicator', evaluation.overweight_indicator)
    assert.deepPropertyVal(model, 'taylor_cut_point', evaluation.taylor_cut_point)
    assert.deepPropertyVal(model, 'blood_glucose', evaluation.blood_glucose)
    assert.deepPropertyVal(model, 'blood_pressure', evaluation.blood_pressure)
    assert.deepPropertyVal(model, 'counseling', evaluation.counseling)
    assert.deepPropertyVal(model, 'physical_activity_habits', evaluation.physical_activity_habits)
    assert.deepPropertyVal(model, 'feeding_habits_record', evaluation.feeding_habits_record)
    assert.deepPropertyVal(model, 'medical_record', evaluation.medical_record)
}

function validateModel(model) {
    assert.propertyVal(model, 'id', DefaultEntityMock.NUTRITION_EVALUATION.id)
    assert.propertyVal(model, 'type', evaluation.type)
    assert.deepPropertyVal(model, 'patient', evaluation.patient!.toJSON())
    assert.deepPropertyVal(model, 'nutritional_status', evaluation.nutritional_status!.toJSON())
    assert.deepPropertyVal(model, 'overweight_indicator', evaluation.overweight_indicator!.toJSON())
    assert.deepPropertyVal(model, 'taylor_cut_point', evaluation.taylor_cut_point!.toJSON())
    assert.deepPropertyVal(model, 'blood_glucose', evaluation.blood_glucose!.toJSON())
    assert.deepPropertyVal(model, 'blood_pressure', evaluation.blood_pressure!.toJSON())
    assert.deepPropertyVal(model, 'counseling', evaluation.counseling!.toJSON())
    assert.deepPropertyVal(model, 'physical_activity_habits', evaluation.physical_activity_habits!.toJSON())
    assert.deepPropertyVal(model, 'feeding_habits_record', evaluation.feeding_habits_record!.toJSON())
    assert.deepPropertyVal(model, 'medical_record', evaluation.medical_record!.toJSON())
}
