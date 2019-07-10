import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { NutritionCounseling } from '../../../src/application/domain/model/nutrition.counseling'

describe('Models: NutritionCounseling', () => {
    const data: NutritionCounseling = new NutritionCounseling().fromJSON(DefaultEntityMock.NUTRITION_COUNSELING)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionCounseling = new NutritionCounseling().fromJSON(DefaultEntityMock.NUTRITION_COUNSELING)
                assert.deepPropertyVal(result, 'thinness_counseling', data.thinness_counseling)
                assert.deepPropertyVal(result, 'eutrophy_counseling', data.eutrophy_counseling)
                assert.deepPropertyVal(result, 'overweight_obesity_counseling', data.overweight_obesity_counseling)
                assert.deepPropertyVal(
                    result, 'insulin_resistance_diabetes_counseling', data.insulin_resistance_diabetes_counseling)
                assert.deepPropertyVal(result, 'hypertension_counseling', data.hypertension_counseling)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionCounseling = new NutritionCounseling().fromJSON({})
                assert.deepPropertyVal(result, 'thinness_counseling', undefined)
                assert.deepPropertyVal(result, 'eutrophy_counseling', undefined)
                assert.deepPropertyVal(result, 'overweight_obesity_counseling', undefined)
                assert.deepPropertyVal(result, 'insulin_resistance_diabetes_counseling', undefined)
                assert.deepPropertyVal(result, 'hypertension_counseling', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionCounseling =
                    new NutritionCounseling().fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_COUNSELING))
                assert.deepPropertyVal(result, 'thinness_counseling', data.thinness_counseling)
                assert.deepPropertyVal(result, 'eutrophy_counseling', data.eutrophy_counseling)
                assert.deepPropertyVal(result, 'overweight_obesity_counseling', data.overweight_obesity_counseling)
                assert.deepPropertyVal(
                    result, 'insulin_resistance_diabetes_counseling', data.insulin_resistance_diabetes_counseling)
                assert.deepPropertyVal(result, 'hypertension_counseling', data.hypertension_counseling)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionCounseling = new NutritionCounseling().fromJSON('')
                assert.deepPropertyVal(result, 'thinness_counseling', undefined)
                assert.deepPropertyVal(result, 'eutrophy_counseling', undefined)
                assert.deepPropertyVal(result, 'overweight_obesity_counseling', undefined)
                assert.deepPropertyVal(result, 'insulin_resistance_diabetes_counseling', undefined)
                assert.deepPropertyVal(result, 'hypertension_counseling', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: NutritionCounseling = new NutritionCounseling().fromJSON('')
                assert.deepPropertyVal(result, 'thinness_counseling', undefined)
                assert.deepPropertyVal(result, 'eutrophy_counseling', undefined)
                assert.deepPropertyVal(result, 'overweight_obesity_counseling', undefined)
                assert.deepPropertyVal(result, 'insulin_resistance_diabetes_counseling', undefined)
                assert.deepPropertyVal(result, 'hypertension_counseling', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: NutritionCounseling = new NutritionCounseling().fromJSON(DefaultEntityMock.NUTRITION_COUNSELING)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'thinness_counseling', DefaultEntityMock.NUTRITION_COUNSELING.thinness_counseling)
            assert.deepPropertyVal(result, 'eutrophy_counseling', DefaultEntityMock.NUTRITION_COUNSELING.eutrophy_counseling)
            assert.deepPropertyVal(
                result, 'overweight_obesity_counseling', DefaultEntityMock.NUTRITION_COUNSELING.overweight_obesity_counseling)
            assert.deepPropertyVal(
                result, 'insulin_resistance_diabetes_counseling',
                DefaultEntityMock.NUTRITION_COUNSELING.insulin_resistance_diabetes_counseling)
        })
    })
})
