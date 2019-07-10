import { BmiPerAge } from '../../../src/application/domain/model/bmi.per.age'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: BmiPerAge', () => {
    const data: BmiPerAge = new BmiPerAge().fromJSON(DefaultEntityMock.BMI_PER_AGE)

    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BmiPerAge = new BmiPerAge().fromJSON(DefaultEntityMock.BMI_PER_AGE)
                assert.deepPropertyVal(result, 'bmi_per_age_boys', data.bmi_per_age_boys)
                assert.deepPropertyVal(result, 'bmi_per_age_girls', data.bmi_per_age_girls)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BmiPerAge = new BmiPerAge().fromJSON({})
                assert.deepPropertyVal(result, 'bmi_per_age_boys', undefined)
                assert.deepPropertyVal(result, 'bmi_per_age_girls', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: BmiPerAge = new BmiPerAge().fromJSON(JSON.stringify(DefaultEntityMock.BMI_PER_AGE))
                assert.deepPropertyVal(result, 'bmi_per_age_boys', data.bmi_per_age_boys)
                assert.deepPropertyVal(result, 'bmi_per_age_girls', data.bmi_per_age_girls)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: BmiPerAge = new BmiPerAge().fromJSON('')
                assert.deepPropertyVal(result, 'bmi_per_age_boys', undefined)
                assert.deepPropertyVal(result, 'bmi_per_age_girls', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: BmiPerAge = new BmiPerAge().fromJSON('invalid')
                assert.deepPropertyVal(result, 'bmi_per_age_boys', undefined)
                assert.deepPropertyVal(result, 'bmi_per_age_girls', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: BmiPerAge = new BmiPerAge().fromJSON(DefaultEntityMock.BMI_PER_AGE)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'bmi_per_age_boys', data.toJSON().bmi_per_age_boys)
            assert.deepPropertyVal(result, 'bmi_per_age_girls', data.toJSON().bmi_per_age_girls)
        })
    })
})
