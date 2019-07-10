import { BloodPressurePerSysDias } from '../../../src/application/domain/model/blood.pressure.per.sys.dias'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: BloodPressurePerSysDias', () => {
    const data: BloodPressurePerSysDias =
        new BloodPressurePerSysDias().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_PER_SYS_DIAS)

    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodPressurePerSysDias =
                    new BloodPressurePerSysDias().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_PER_SYS_DIAS)
                assert.deepPropertyVal(
                    result, 'age_systolic_diastolic_percentile_boys', data.age_systolic_diastolic_percentile_boys)
                assert.deepPropertyVal(
                    result, 'age_systolic_diastolic_percentile_girls', data.age_systolic_diastolic_percentile_girls)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodPressurePerSysDias = new BloodPressurePerSysDias().fromJSON({})
                assert.deepPropertyVal(result, 'age_systolic_diastolic_percentile_boys', undefined)
                assert.deepPropertyVal(result, 'age_systolic_diastolic_percentile_girls', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodPressurePerSysDias =
                    new BloodPressurePerSysDias().fromJSON(JSON.stringify(DefaultEntityMock.BLOOD_PRESSURE_PER_SYS_DIAS))
                assert.deepPropertyVal(
                    result, 'age_systolic_diastolic_percentile_boys', data.age_systolic_diastolic_percentile_boys)
                assert.deepPropertyVal(
                    result, 'age_systolic_diastolic_percentile_girls', data.age_systolic_diastolic_percentile_girls)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodPressurePerSysDias = new BloodPressurePerSysDias().fromJSON('')
                assert.deepPropertyVal(result, 'age_systolic_diastolic_percentile_boys', undefined)
                assert.deepPropertyVal(result, 'age_systolic_diastolic_percentile_girls', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: BloodPressurePerSysDias = new BloodPressurePerSysDias().fromJSON('invalid')
                assert.deepPropertyVal(result, 'age_systolic_diastolic_percentile_boys', undefined)
                assert.deepPropertyVal(result, 'age_systolic_diastolic_percentile_girls', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: BloodPressurePerSysDias =
                new BloodPressurePerSysDias().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_PER_SYS_DIAS)
            const result = model.toJSON()
            assert.deepPropertyVal(
                result,
                'age_systolic_diastolic_percentile_boys',
                DefaultEntityMock.BLOOD_PRESSURE_PER_SYS_DIAS.age_systolic_diastolic_percentile_boys)
            assert.deepPropertyVal(
                result,
                'age_systolic_diastolic_percentile_girls',
                DefaultEntityMock.BLOOD_PRESSURE_PER_SYS_DIAS.age_systolic_diastolic_percentile_girls)
        })
    })
})
