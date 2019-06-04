import { OdontologicEvaluation } from '../../../src/application/domain/model/odontologic.evaluation'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: OdontologicEvaluation', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: OdontologicEvaluation =
                    new OdontologicEvaluation().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION)
                assert.propertyVal(result, 'file_csv', DefaultEntityMock.ODONTOLOGIC_EVALUATION.file_csv)
                assert.propertyVal(result, 'file_xls', DefaultEntityMock.ODONTOLOGIC_EVALUATION.file_xls)
                // assert.deepPropertyVal(result, 'created_at', DefaultEntityMock.ODONTOLOGIC_EVALUATION.created_at)
                assert.propertyVal(result, 'total_patients', DefaultEntityMock.ODONTOLOGIC_EVALUATION.total_patients)
                assert.propertyVal(
                    result, 'health_professional_id', DefaultEntityMock.ODONTOLOGIC_EVALUATION.health_professional_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: OdontologicEvaluation = new OdontologicEvaluation().fromJSON({})
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.deepPropertyVal(result, 'created_at', undefined)
                assert.propertyVal(result, 'total_patients', undefined)
                assert.propertyVal(result, 'health_professional_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: OdontologicEvaluation =
                    new OdontologicEvaluation().fromJSON(JSON.stringify(DefaultEntityMock.ODONTOLOGIC_EVALUATION))
                assert.propertyVal(result, 'file_csv', DefaultEntityMock.ODONTOLOGIC_EVALUATION.file_csv)
                assert.propertyVal(result, 'file_xls', DefaultEntityMock.ODONTOLOGIC_EVALUATION.file_xls)
                // assert.deepPropertyVal(result, 'created_at', DefaultEntityMock.ODONTOLOGIC_EVALUATION.created_at)
                assert.propertyVal(result, 'total_patients', DefaultEntityMock.ODONTOLOGIC_EVALUATION.total_patients)
                assert.propertyVal(
                    result, 'health_professional_id', DefaultEntityMock.ODONTOLOGIC_EVALUATION.health_professional_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: OdontologicEvaluation = new OdontologicEvaluation().fromJSON('')
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.deepPropertyVal(result, 'created_at', undefined)
                assert.propertyVal(result, 'total_patients', undefined)
                assert.propertyVal(result, 'health_professional_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: OdontologicEvaluation = new OdontologicEvaluation().fromJSON('invalid')
                assert.propertyVal(result, 'file_csv', undefined)
                assert.propertyVal(result, 'file_xls', undefined)
                assert.deepPropertyVal(result, 'created_at', undefined)
                assert.propertyVal(result, 'total_patients', undefined)
                assert.propertyVal(result, 'health_professional_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: OdontologicEvaluation =
                new OdontologicEvaluation().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION)
            const result = model.toJSON()
            assert.propertyVal(result, 'file_csv', DefaultEntityMock.ODONTOLOGIC_EVALUATION.file_csv)
            assert.propertyVal(result, 'file_xls', DefaultEntityMock.ODONTOLOGIC_EVALUATION.file_xls)
            // assert.deepPropertyVal(result, 'created_at', DefaultEntityMock.ODONTOLOGIC_EVALUATION.created_at)
            assert.propertyVal(result, 'total_patients', DefaultEntityMock.ODONTOLOGIC_EVALUATION.total_patients)
            assert.propertyVal(
                result, 'health_professional_id', DefaultEntityMock.ODONTOLOGIC_EVALUATION.health_professional_id)
        })
    })
})
