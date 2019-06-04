import { EvaluationFile } from '../../../src/application/domain/model/evaluation.file'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: EvaluationFile', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: EvaluationFile = new EvaluationFile().fromJSON(DefaultEntityMock.EVALUATION_FILE)
                assert.propertyVal(result, 'file', DefaultEntityMock.EVALUATION_FILE.file)
                assert.propertyVal(result, 'name', DefaultEntityMock.EVALUATION_FILE.name)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: EvaluationFile = new EvaluationFile().fromJSON({})
                assert.propertyVal(result, 'file', undefined)
                assert.propertyVal(result, 'name', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: EvaluationFile = new EvaluationFile().fromJSON(JSON.stringify(DefaultEntityMock.EVALUATION_FILE))
                assert.propertyVal(result, 'file', DefaultEntityMock.EVALUATION_FILE.file)
                assert.propertyVal(result, 'name', DefaultEntityMock.EVALUATION_FILE.name)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: EvaluationFile = new EvaluationFile().fromJSON('')
                assert.propertyVal(result, 'file', undefined)
                assert.propertyVal(result, 'name', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: EvaluationFile = new EvaluationFile().fromJSON('invalid')
                assert.propertyVal(result, 'file', undefined)
                assert.propertyVal(result, 'name', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: EvaluationFile = new EvaluationFile().fromJSON(DefaultEntityMock.EVALUATION_FILE)
            const result = model.toJSON()
            assert.propertyVal(result, 'file', DefaultEntityMock.EVALUATION_FILE.file)
            assert.propertyVal(result, 'name', DefaultEntityMock.EVALUATION_FILE.name)
        })
    })
})
