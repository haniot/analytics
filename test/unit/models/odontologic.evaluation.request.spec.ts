import { OdontologicEvaluationRequest } from '../../../src/application/domain/model/odontologic.evaluation.request'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: OdontologicEvaluationRequest', () => {
    const data: OdontologicEvaluationRequest =
        new OdontologicEvaluationRequest().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: OdontologicEvaluationRequest =
                    new OdontologicEvaluationRequest().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST)
                assert.propertyVal(result, 'pilotstudy_id', data.pilotstudy_id)
                assert.deepPropertyVal(result, 'patient', data.patient)
                assert.deepPropertyVal(result, 'measurements', data.measurements)
                assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
                assert.deepPropertyVal(result, 'sociodemographic_record', data.sociodemographic_record)
                assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit)
                assert.deepPropertyVal(result, 'oral_health_record', data.oral_health_record)
                assert.deepPropertyVal(result, 'family_cohesion_record', data.family_cohesion_record)
                assert.propertyVal(result, 'health_professional_id', data.health_professional_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: OdontologicEvaluationRequest = new OdontologicEvaluationRequest().fromJSON({})
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.deepPropertyVal(result, 'patient', undefined)
                assert.deepPropertyVal(result, 'measurements', undefined)
                assert.deepPropertyVal(result, 'feeding_habits_record', undefined)
                assert.deepPropertyVal(result, 'sociodemographic_record', undefined)
                assert.deepPropertyVal(result, 'sleep_habit', undefined)
                assert.deepPropertyVal(result, 'oral_health_record', undefined)
                assert.deepPropertyVal(result, 'family_cohesion_record', undefined)
                assert.propertyVal(result, 'health_professional_id', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: OdontologicEvaluationRequest =
                    new OdontologicEvaluationRequest().fromJSON(JSON.stringify(DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST))
                assert.propertyVal(result, 'pilotstudy_id', data.pilotstudy_id)
                assert.deepPropertyVal(result, 'patient', data.patient)
                assert.deepPropertyVal(result, 'measurements', data.measurements)
                assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
                assert.deepPropertyVal(result, 'sociodemographic_record', data.sociodemographic_record)
                assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit)
                assert.deepPropertyVal(result, 'oral_health_record', data.oral_health_record)
                assert.deepPropertyVal(result, 'family_cohesion_record', data.family_cohesion_record)
                assert.propertyVal(result, 'health_professional_id', data.health_professional_id)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: OdontologicEvaluationRequest = new OdontologicEvaluationRequest().fromJSON('')
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.deepPropertyVal(result, 'patient', undefined)
                assert.deepPropertyVal(result, 'measurements', undefined)
                assert.deepPropertyVal(result, 'feeding_habits_record', undefined)
                assert.deepPropertyVal(result, 'sociodemographic_record', undefined)
                assert.deepPropertyVal(result, 'sleep_habit', undefined)
                assert.deepPropertyVal(result, 'oral_health_record', undefined)
                assert.deepPropertyVal(result, 'family_cohesion_record', undefined)
                assert.propertyVal(result, 'health_professional_id', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: OdontologicEvaluationRequest = new OdontologicEvaluationRequest().fromJSON('invalid')
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.deepPropertyVal(result, 'patient', undefined)
                assert.deepPropertyVal(result, 'measurements', undefined)
                assert.deepPropertyVal(result, 'feeding_habits_record', undefined)
                assert.deepPropertyVal(result, 'sociodemographic_record', undefined)
                assert.deepPropertyVal(result, 'sleep_habit', undefined)
                assert.deepPropertyVal(result, 'oral_health_record', undefined)
                assert.deepPropertyVal(result, 'family_cohesion_record', undefined)
                assert.propertyVal(result, 'health_professional_id', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: OdontologicEvaluationRequest =
                new OdontologicEvaluationRequest().fromJSON(DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST)
            const result = model.toJSON()
            assert.propertyVal(result, 'pilotstudy_id', DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST.pilotstudy_id)
            // assert.deepPropertyVal(result, 'patient', DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST.patient)
            // assert.deepPropertyVal(result, 'measurements', DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST.measurements)
            // assert.deepPropertyVal(
            //     result, 'feeding_habits_record', DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST.feeding_habits_record)
            // assert.deepPropertyVal(
            //     result, 'sociodemographic_record', DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST.sociodemographic_record)
            // assert.deepPropertyVal(
            //     result, 'sleep_habit', DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST.sleep_habit)
            // assert.deepPropertyVal(
            //     result, 'oral_health_record', DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST.oral_health_record)
            // assert.deepPropertyVal
            // (result, 'family_cohesion_record', DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST.family_cohesion_record)
            assert.propertyVal(
                result, 'health_professional_id', DefaultEntityMock.ODONTOLOGIC_EVALUATION_REQUEST.health_professional_id)
        })
    })
})
