import { NutritionEvaluationRequest } from '../../../src/application/domain/model/nutrition.evaluation.request'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: NutritionEvaluationRequest', () => {
    const data: NutritionEvaluationRequest =
        new NutritionEvaluationRequest().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST)

    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionEvaluationRequest =
                    new NutritionEvaluationRequest().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST)
                assert.deepPropertyVal(result, 'measurements', data.measurements)
                assert.deepPropertyVal(result, 'patient', data.patient)
                assert.deepPropertyVal(result, 'medical_record', data.medical_record)
                assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
                assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits)
                assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit)
                assert.deepPropertyVal(result, 'health_professional_id', data.health_professional_id)
                assert.deepPropertyVal(result, 'pilotstudy_id', data.pilotstudy_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionEvaluationRequest = new NutritionEvaluationRequest().fromJSON({})
                assert.deepPropertyVal(result, 'measurements', undefined)
                assert.deepPropertyVal(result, 'patient', undefined)
                assert.deepPropertyVal(result, 'medical_record', undefined)
                assert.deepPropertyVal(result, 'feeding_habits_record', undefined)
                assert.deepPropertyVal(result, 'physical_activity_habits', undefined)
                assert.deepPropertyVal(result, 'sleep_habit', undefined)
                assert.deepPropertyVal(result, 'health_professional_id', undefined)
                assert.deepPropertyVal(result, 'pilotstudy_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionEvaluationRequest =
                    new NutritionEvaluationRequest().fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST))
                assert.deepPropertyVal(result, 'measurements', data.measurements)
                assert.deepPropertyVal(result, 'patient', data.patient)
                assert.deepPropertyVal(result, 'medical_record', data.medical_record)
                assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
                assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits)
                assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit)
                assert.deepPropertyVal(result, 'health_professional_id', data.health_professional_id)
                assert.deepPropertyVal(result, 'pilotstudy_id', data.pilotstudy_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionEvaluationRequest = new NutritionEvaluationRequest().fromJSON('')
                assert.deepPropertyVal(result, 'measurements', undefined)
                assert.deepPropertyVal(result, 'patient', undefined)
                assert.deepPropertyVal(result, 'medical_record', undefined)
                assert.deepPropertyVal(result, 'feeding_habits_record', undefined)
                assert.deepPropertyVal(result, 'physical_activity_habits', undefined)
                assert.deepPropertyVal(result, 'sleep_habit', undefined)
                assert.deepPropertyVal(result, 'health_professional_id', undefined)
                assert.deepPropertyVal(result, 'pilotstudy_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: NutritionEvaluationRequest = new NutritionEvaluationRequest().fromJSON('invalid')
                assert.deepPropertyVal(result, 'measurements', undefined)
                assert.deepPropertyVal(result, 'patient', undefined)
                assert.deepPropertyVal(result, 'medical_record', undefined)
                assert.deepPropertyVal(result, 'feeding_habits_record', undefined)
                assert.deepPropertyVal(result, 'physical_activity_habits', undefined)
                assert.deepPropertyVal(result, 'sleep_habit', undefined)
                assert.deepPropertyVal(result, 'health_professional_id', undefined)
                assert.deepPropertyVal(result, 'pilotstudy_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const result = data.toJSON()
            assert.deepPropertyVal(
                result, 'health_professional_id', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.health_professional_id)
            assert.deepPropertyVal(result, 'pilotstudy_id', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.pilotstudy_id)
            // assert.deepPropertyVal(result, 'measurements', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.measurements)
            // assert.deepPropertyVal(result, 'patient', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient)
            // assert.deepPropertyVal(result, 'medical_record', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.medical_record)
            // assert.deepPropertyVal(
            //     result, 'feeding_habits_record', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.feeding_habits_record)
            // assert.deepPropertyVal(
            //     result, 'physical_activity_habits', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.physical_activity_habits)
            // assert.deepPropertyVal(result, 'sleep_habit', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.sleep_habit)
        })
    })
})
