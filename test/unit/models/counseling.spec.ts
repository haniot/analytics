import { Counseling } from '../../../src/application/domain/model/counseling'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: Counseling', () => {
    const data: Counseling = new Counseling().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION.counseling)

    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Counseling = new Counseling().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION.counseling)
                assert.deepPropertyVal(result, 'suggested', data.suggested)
                assert.deepPropertyVal(result, 'definitive', data.definitive)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Counseling = new Counseling().fromJSON({})
                assert.deepPropertyVal(result, 'suggested', undefined)
                assert.deepPropertyVal(result, 'definitive', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Counseling =
                    new Counseling().fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_EVALUATION.counseling))
                assert.deepPropertyVal(result, 'suggested', data.suggested)
                assert.deepPropertyVal(result, 'definitive', data.definitive)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Counseling = new Counseling().fromJSON('')
                assert.deepPropertyVal(result, 'suggested', undefined)
                assert.deepPropertyVal(result, 'definitive', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: Counseling = new Counseling().fromJSON('invalid')
                assert.deepPropertyVal(result, 'suggested', undefined)
                assert.deepPropertyVal(result, 'definitive', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: Counseling = new Counseling().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION.counseling)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'suggested', DefaultEntityMock.NUTRITION_EVALUATION.counseling.suggested)
            assert.deepPropertyVal(result, 'definitive', DefaultEntityMock.NUTRITION_EVALUATION.counseling.definitive)
        })
    })
})
