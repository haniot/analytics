import { assert } from 'chai'
import { BloodPressurePerSysDiasRepository } from '../../../src/infrastructure/repository/blood.pressure.per.sys.dias.repository'

describe('Repositories: BloodPressurePerSysDiasRepository', () => {
    const repo: BloodPressurePerSysDiasRepository = new BloodPressurePerSysDiasRepository()

    describe('getFile()', () => {
        context('when get a nutritional counseling from .csv file', () => {
            it('should return a nutritional counseling', () => {
                return repo.getFile()
                    .then(res => {
                        assert.isArray(res.age_systolic_diastolic_percentile_boys)
                        assert.isArray(res.age_systolic_diastolic_percentile_girls)
                        assert.isNotEmpty(res.age_systolic_diastolic_percentile_boys)
                        assert.isNotEmpty(res.age_systolic_diastolic_percentile_girls)
                    })
            })
        })
    })
})
