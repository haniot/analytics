import { NutritionCouncil } from '../../../src/application/domain/model/nutrition.council'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: NutritionCouncil', () => {
    const data: NutritionCouncil = new NutritionCouncil().fromJSON(DefaultEntityMock.NUTRITION_COUNCIL)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionCouncil = new NutritionCouncil().fromJSON(DefaultEntityMock.NUTRITION_COUNCIL)
                assert.deepPropertyVal(result, 'bmi_whr', data.bmi_whr)
                assert.deepPropertyVal(result, 'blood_pressure', data.blood_pressure)
                assert.deepPropertyVal(result, 'glycemia', data.glycemia)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionCouncil = new NutritionCouncil().fromJSON({})
                assert.deepPropertyVal(result, 'bmi_whr', undefined)
                assert.deepPropertyVal(result, 'blood_pressure', undefined)
                assert.deepPropertyVal(result, 'glycemia', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: NutritionCouncil =
                    new NutritionCouncil().fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_COUNCIL))
                assert.deepPropertyVal(result, 'bmi_whr', data.bmi_whr)
                assert.deepPropertyVal(result, 'blood_pressure', data.blood_pressure)
                assert.deepPropertyVal(result, 'glycemia', data.glycemia)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: NutritionCouncil = new NutritionCouncil().fromJSON('')
                assert.deepPropertyVal(result, 'bmi_whr', undefined)
                assert.deepPropertyVal(result, 'blood_pressure', undefined)
                assert.deepPropertyVal(result, 'glycemia', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: NutritionCouncil = new NutritionCouncil().fromJSON('')
                assert.deepPropertyVal(result, 'bmi_whr', undefined)
                assert.deepPropertyVal(result, 'blood_pressure', undefined)
                assert.deepPropertyVal(result, 'glycemia', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: NutritionCouncil = new NutritionCouncil().fromJSON(DefaultEntityMock.NUTRITION_COUNCIL)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'bmi_whr', DefaultEntityMock.NUTRITION_COUNCIL.bmi_whr)
            assert.deepPropertyVal(result, 'blood_pressure', DefaultEntityMock.NUTRITION_COUNCIL.blood_pressure)
            assert.deepPropertyVal(result, 'glycemia', DefaultEntityMock.NUTRITION_COUNCIL.glycemia)
        })
    })
})
