import { assert } from 'chai'
import { BmiPerAgeRepository } from '../../../src/infrastructure/repository/bmi.per.age.repository'

describe('Repositories: BmiPerAgeRepository', () => {
    const repo: BmiPerAgeRepository = new BmiPerAgeRepository()

    describe('getFile()', () => {
        context('when get a nutritional counseling from .csv file', () => {
            it('should return a nutritional counseling', () => {
                return repo.getFile()
                    .then(res => {
                        assert.isArray(res.bmi_per_age_boys)
                        assert.isArray(res.bmi_per_age_girls)
                        assert.isNotEmpty(res.bmi_per_age_boys)
                        assert.isNotEmpty(res.bmi_per_age_girls)
                    })
            })
        })
    })
})
