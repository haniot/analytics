import { BloodPressurePerAgeHeightRepository } from '../../../src/infrastructure/repository/blood.pressure.per.age.height.repository'
import { assert } from 'chai'

describe('Repositories: BloodPressurePerAgeHeightRepository', () => {
    const repo: BloodPressurePerAgeHeightRepository = new BloodPressurePerAgeHeightRepository()

    describe('getFile()', () => {
        context('when get a nutritional counseling from .csv file', () => {
            it('should return a nutritional counseling', () => {
                return repo.getFile()
                    .then(res => {
                        assert.isArray(res.blood_pressure_per_age_boys)
                        assert.isArray(res.blood_pressure_per_age_girls)
                        assert.isNotEmpty(res.blood_pressure_per_age_boys)
                        assert.isNotEmpty(res.blood_pressure_per_age_girls)
                    })
            })
        })
    })
})
