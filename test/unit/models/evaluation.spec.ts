import { Evaluation } from '../../../src/application/domain/model/evaluation'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: Evaluation', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Evaluation = new Evaluation().fromJSON(DefaultEntityMock.EVALUATION)
                assert.propertyVal(result, 'health_professional_id', DefaultEntityMock.EVALUATION.health_professional_id)
                assert.propertyVal(result, 'pilotstudy_id', DefaultEntityMock.EVALUATION.pilotstudy_id)
                assert.propertyVal(result, 'type', DefaultEntityMock.EVALUATION.type)
                assert.propertyVal(result, 'status', DefaultEntityMock.EVALUATION.status)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Evaluation = new Evaluation().fromJSON({})
                assert.deepPropertyVal(result, 'created_at', undefined)
                assert.deepPropertyVal(result, 'type', undefined)
                assert.propertyVal(result, 'health_professional_id', undefined)
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.propertyVal(result, 'status', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: Evaluation = new Evaluation().fromJSON(JSON.stringify(DefaultEntityMock.EVALUATION))
                assert.propertyVal(result, 'health_professional_id', DefaultEntityMock.EVALUATION.health_professional_id)
                assert.propertyVal(result, 'pilotstudy_id', DefaultEntityMock.EVALUATION.pilotstudy_id)
                assert.propertyVal(result, 'status', DefaultEntityMock.EVALUATION.status)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: Evaluation = new Evaluation().fromJSON('')
                assert.deepPropertyVal(result, 'created_at', undefined)
                assert.deepPropertyVal(result, 'type', undefined)
                assert.propertyVal(result, 'health_professional_id', undefined)
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.propertyVal(result, 'status', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: Evaluation = new Evaluation().fromJSON('invalid')
                assert.deepPropertyVal(result, 'created_at', undefined)
                assert.deepPropertyVal(result, 'type', undefined)
                assert.propertyVal(result, 'health_professional_id', undefined)
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.propertyVal(result, 'status', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: Evaluation = new Evaluation().fromJSON(DefaultEntityMock.EVALUATION)
            const result = model.toJSON()
            assert.propertyVal(result, 'health_professional_id', DefaultEntityMock.EVALUATION.health_professional_id)
            assert.propertyVal(result, 'pilotstudy_id', DefaultEntityMock.EVALUATION.pilotstudy_id)
            assert.propertyVal(result, 'status', DefaultEntityMock.EVALUATION.status)
        })
    })
})
