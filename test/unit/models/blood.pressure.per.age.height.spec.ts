import { BloodPressurePerAgeHeight } from '../../../src/application/domain/model/blood.pressure.per.age.height'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: BloodPressurePerAgeHeight', () => {
    const data: BloodPressurePerAgeHeight =
        new BloodPressurePerAgeHeight().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_PER_AGE_HEIGHT)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodPressurePerAgeHeight =
                    new BloodPressurePerAgeHeight().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_PER_AGE_HEIGHT)
                assert.deepPropertyVal(result, 'blood_pressure_per_age_boys', data.blood_pressure_per_age_boys)
                assert.deepPropertyVal(result, 'blood_pressure_per_age_girls', data.blood_pressure_per_age_girls)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodPressurePerAgeHeight =
                    new BloodPressurePerAgeHeight().fromJSON({})
                assert.deepPropertyVal(result, 'blood_pressure_per_age_boys', undefined)
                assert.deepPropertyVal(result, 'blood_pressure_per_age_girls', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BloodPressurePerAgeHeight =
                    new BloodPressurePerAgeHeight().fromJSON(JSON.stringify(DefaultEntityMock.BLOOD_PRESSURE_PER_AGE_HEIGHT))
                assert.deepPropertyVal(result, 'blood_pressure_per_age_boys', data.blood_pressure_per_age_boys)
                assert.deepPropertyVal(result, 'blood_pressure_per_age_girls', data.blood_pressure_per_age_girls)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BloodPressurePerAgeHeight =
                    new BloodPressurePerAgeHeight().fromJSON('')
                assert.deepPropertyVal(result, 'blood_pressure_per_age_boys', undefined)
                assert.deepPropertyVal(result, 'blood_pressure_per_age_girls', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: BloodPressurePerAgeHeight =
                    new BloodPressurePerAgeHeight().fromJSON('invalid')
                assert.deepPropertyVal(result, 'blood_pressure_per_age_boys', undefined)
                assert.deepPropertyVal(result, 'blood_pressure_per_age_girls', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: BloodPressurePerAgeHeight =
                new BloodPressurePerAgeHeight().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_PER_AGE_HEIGHT)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'blood_pressure_per_age_boys',
                DefaultEntityMock.BLOOD_PRESSURE_PER_AGE_HEIGHT.blood_pressure_per_age_boys)
            assert.deepPropertyVal(result, 'blood_pressure_per_age_girls',
                DefaultEntityMock.BLOOD_PRESSURE_PER_AGE_HEIGHT.blood_pressure_per_age_girls)
        })
    })
})
