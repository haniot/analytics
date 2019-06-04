import { TaylorCutPoint } from '../../../src/application/domain/model/taylor.cut.point'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: TaylorCutPoint', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: TaylorCutPoint =
                    new TaylorCutPoint().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point)
                assert.propertyVal(
                    result, 'classification', DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point.classification)
                assert.propertyVal(
                    result, 'waist_circumference', DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point.waist_circumference)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: TaylorCutPoint = new TaylorCutPoint().fromJSON({})
                assert.propertyVal(result, 'classification', undefined)
                assert.propertyVal(result, 'waist_circumference', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: TaylorCutPoint =
                    new TaylorCutPoint().fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point))
                assert.propertyVal(
                    result, 'classification', DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point.classification)
                assert.propertyVal(
                    result, 'waist_circumference', DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point.waist_circumference)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: TaylorCutPoint = new TaylorCutPoint().fromJSON('')
                assert.propertyVal(result, 'classification', undefined)
                assert.propertyVal(result, 'waist_circumference', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: TaylorCutPoint = new TaylorCutPoint().fromJSON('invalid')
                assert.propertyVal(result, 'classification', undefined)
                assert.propertyVal(result, 'waist_circumference', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: TaylorCutPoint =
                new TaylorCutPoint().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point)
            const result = model.toJSON()
            assert.propertyVal(
                result, 'classification', DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point.classification)
            assert.propertyVal(
                result, 'waist_circumference', DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point.waist_circumference)
        })
    })
})
