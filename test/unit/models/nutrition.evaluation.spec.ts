import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { NutritionEvaluation } from '../../../src/application/domain/model/nutrition.evaluation'

describe('Models: NutritionEvaluation', () => {
    const data: NutritionEvaluation =
        new NutritionEvaluation().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION)

    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionEvaluation =
                    new NutritionEvaluation().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION)
                assert.deepPropertyVal(result, 'status', data.status)
                assert.deepPropertyVal(result, 'patient', data.patient)
                assert.deepPropertyVal(result, 'nutritional_status', data.nutritional_status)
                assert.deepPropertyVal(result, 'overweight_indicator', data.overweight_indicator)
                assert.deepPropertyVal(result, 'taylor_cut_point', data.taylor_cut_point)
                assert.deepPropertyVal(result, 'heart_rate', data.heart_rate)
                assert.deepPropertyVal(result, 'blood_glucose', data.blood_glucose)
                assert.deepPropertyVal(result, 'blood_pressure', data.blood_pressure)
                assert.deepPropertyVal(result, 'counseling', data.counseling)
                assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits)
                assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
                assert.deepPropertyVal(result, 'medical_record', data.medical_record)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionEvaluation = new NutritionEvaluation().fromJSON({})
                assert.deepPropertyVal(result, 'status', undefined)
                assert.deepPropertyVal(result, 'patient', undefined)
                assert.deepPropertyVal(result, 'nutritional_status', undefined)
                assert.deepPropertyVal(result, 'overweight_indicator', undefined)
                assert.deepPropertyVal(result, 'taylor_cut_point', undefined)
                assert.deepPropertyVal(result, 'heart_rate', undefined)
                assert.deepPropertyVal(result, 'blood_glucose', undefined)
                assert.deepPropertyVal(result, 'blood_pressure', undefined)
                assert.deepPropertyVal(result, 'counseling', undefined)
                assert.deepPropertyVal(result, 'measurements', undefined)
                assert.deepPropertyVal(result, 'physical_activity_habits', undefined)
                assert.deepPropertyVal(result, 'feeding_habits_record', undefined)
                assert.deepPropertyVal(result, 'medical_record', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionEvaluation =
                    new NutritionEvaluation().fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_EVALUATION))
                assert.deepPropertyVal(result, 'status', data.status)
                assert.deepPropertyVal(result, 'patient', data.patient)
                assert.deepPropertyVal(result, 'nutritional_status', data.nutritional_status)
                assert.deepPropertyVal(result, 'overweight_indicator', data.overweight_indicator)
                assert.deepPropertyVal(result, 'taylor_cut_point', data.taylor_cut_point)
                assert.deepPropertyVal(result, 'heart_rate', data.heart_rate)
                assert.deepPropertyVal(result, 'blood_glucose', data.blood_glucose)
                assert.deepPropertyVal(result, 'blood_pressure', data.blood_pressure)
                assert.deepPropertyVal(result, 'counseling', data.counseling)
                assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits)
                assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
                assert.deepPropertyVal(result, 'medical_record', data.medical_record)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionEvaluation = new NutritionEvaluation().fromJSON('')
                assert.deepPropertyVal(result, 'status', undefined)
                assert.deepPropertyVal(result, 'patient', undefined)
                assert.deepPropertyVal(result, 'nutritional_status', undefined)
                assert.deepPropertyVal(result, 'overweight_indicator', undefined)
                assert.deepPropertyVal(result, 'taylor_cut_point', undefined)
                assert.deepPropertyVal(result, 'heart_rate', undefined)
                assert.deepPropertyVal(result, 'blood_glucose', undefined)
                assert.deepPropertyVal(result, 'blood_pressure', undefined)
                assert.deepPropertyVal(result, 'counseling', undefined)
                assert.deepPropertyVal(result, 'measurements', undefined)
                assert.deepPropertyVal(result, 'physical_activity_habits', undefined)
                assert.deepPropertyVal(result, 'feeding_habits_record', undefined)
                assert.deepPropertyVal(result, 'medical_record', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: NutritionEvaluation = new NutritionEvaluation().fromJSON('invalid')
                assert.deepPropertyVal(result, 'status', undefined)
                assert.deepPropertyVal(result, 'patient', undefined)
                assert.deepPropertyVal(result, 'nutritional_status', undefined)
                assert.deepPropertyVal(result, 'overweight_indicator', undefined)
                assert.deepPropertyVal(result, 'taylor_cut_point', undefined)
                assert.deepPropertyVal(result, 'heart_rate', undefined)
                assert.deepPropertyVal(result, 'blood_glucose', undefined)
                assert.deepPropertyVal(result, 'blood_pressure', undefined)
                assert.deepPropertyVal(result, 'counseling', undefined)
                assert.deepPropertyVal(result, 'measurements', undefined)
                assert.deepPropertyVal(result, 'physical_activity_habits', undefined)
                assert.deepPropertyVal(result, 'feeding_habits_record', undefined)
                assert.deepPropertyVal(result, 'medical_record', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const result = data.toJSON()
            assert.deepPropertyVal(result, 'status', DefaultEntityMock.NUTRITION_EVALUATION.status)
            // assert.deepPropertyVal(result, 'patient',  DefaultEntityMock.NUTRITION_EVALUATION.patient)
            assert.deepPropertyVal(result, 'nutritional_status',  DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status)
            assert.deepPropertyVal(
            result, 'overweight_indicator',  DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator)
            assert.deepPropertyVal(result, 'taylor_cut_point',  DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point)
            assert.deepPropertyVal(result, 'heart_rate',  DefaultEntityMock.NUTRITION_EVALUATION.heart_rate)
            assert.deepPropertyVal(result, 'blood_glucose',  DefaultEntityMock.NUTRITION_EVALUATION.blood_glucose)
            assert.deepPropertyVal(result, 'blood_pressure',  DefaultEntityMock.NUTRITION_EVALUATION.blood_pressure)
            assert.deepPropertyVal(result, 'counseling',  DefaultEntityMock.NUTRITION_EVALUATION.counseling)
            // assert.deepPropertyVal(
            //     result, 'physical_activity_habits',  DefaultEntityMock.NUTRITION_EVALUATION.physical_activity_habits)
            // assert.deepPropertyVal(
            // result, 'feeding_habits_record',  DefaultEntityMock.NUTRITION_EVALUATION.feeding_habits_record)
            // assert.deepPropertyVal(result, 'medical_record',  DefaultEntityMock.NUTRITION_EVALUATION.medical_record)
        })
    })
})
