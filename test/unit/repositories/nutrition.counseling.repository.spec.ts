import { NutritionCounselingRepository } from '../../../src/infrastructure/repository/nutrition.counseling.repository'
import { assert } from 'chai'

describe('Repositories: NutritionCounseling', () => {
    const repo: NutritionCounselingRepository = new NutritionCounselingRepository()

    describe('getFile()', () => {
        context('when get a nutritional counseling from .csv file', () => {
            it('should return a nutritional counseling', () => {
                return repo.getFile()
                    .then(res => {
                        assert.isArray(res.thinness_counseling)
                        assert.isArray(res.eutrophy_counseling)
                        assert.isArray(res.overweight_obesity_counseling)
                        assert.isArray(res.insulin_resistance_diabetes_counseling)
                        assert.isArray(res.hypertension_counseling)
                        assert.isNotEmpty(res.thinness_counseling)
                        assert.isNotEmpty(res.eutrophy_counseling)
                        assert.isNotEmpty(res.overweight_obesity_counseling)
                        assert.isNotEmpty(res.insulin_resistance_diabetes_counseling)
                        assert.isNotEmpty(res.hypertension_counseling)
                    })
            })
        })
    })
})
