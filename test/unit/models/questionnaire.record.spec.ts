import { QuestionnaireRecord } from '../../../src/application/domain/model/questionnaire.record'
import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'

describe('Models: QuestionnaireRecord', () => {
    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new QuestionnaireRecord().fromJSON(DefaultEntityMock.QUESTIONNAIRE_RECORD)
                assert.propertyVal(result, 'type', DefaultEntityMock.QUESTIONNAIRE_RECORD.type)
            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new QuestionnaireRecord().fromJSON(undefined)
                assert.isUndefined(result.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new QuestionnaireRecord().fromJSON({})
                assert.isUndefined(result.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new QuestionnaireRecord().fromJSON(JSON.stringify(DefaultEntityMock.QUESTIONNAIRE_RECORD))
                assert.propertyVal(result, 'type', DefaultEntityMock.QUESTIONNAIRE_RECORD.type)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new QuestionnaireRecord().fromJSON('')
                assert.isUndefined(result.type)
            })

            it('should return the class without parameters for invalid string', () => {
                const result = new QuestionnaireRecord().fromJSON('invalid')
                assert.isUndefined(result.type)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a empty JSON', () => {
            const model: QuestionnaireRecord = new QuestionnaireRecord().fromJSON(DefaultEntityMock.QUESTIONNAIRE_RECORD)
            const result = model.toJSON()
            assert.isEmpty(result)
        })
    })
})
