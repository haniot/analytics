// import { Patient } from '../../../src/application/domain/model/patient'
// import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
// import { assert } from 'chai'
//
// describe('Models: Patient', () => {
//     describe('fromJSON()', () => {
//         context('when transform json to model', () => {
//             it('should return a complete model for pass all parameters', () => {
//                 const result: Patient = new Patient().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient)
//                 assert.propertyVal(result, 'birth_date', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.birth_date)
//                 assert.propertyVal(result, 'email', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.email)
//                 assert.propertyVal(result, 'gender', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.gender)
//                 assert.propertyVal(result, 'name', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.name)
//                 assert.propertyVal(result, 'pilotstudy_id', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.pilotstudy_id)
//             })
//
//             it('should return a incomplete model for not pass all parameters', () => {
//                 const result: Patient = new Patient().fromJSON({})
//                 assert.propertyVal(result, 'birth_date', undefined)
//                 assert.propertyVal(result, 'email', undefined)
//                 assert.propertyVal(result, 'gender', undefined)
//                 assert.propertyVal(result, 'name', undefined)
//                 assert.propertyVal(result, 'pilotstudy_id', undefined)
//             })
//         })
//
//         context('when pass a json as string', () => {
//             it('should return a complete model for pass all parameters', () => {
//                 const result: Patient =
//                     new Patient().fromJSON(JSON.stringify(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient))
//                 assert.propertyVal(result, 'birth_date', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.birth_date)
//                 assert.propertyVal(result, 'email', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.email)
//                 assert.propertyVal(result, 'gender', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.gender)
//                 assert.propertyVal(result, 'name', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.name)
//                 assert.propertyVal(result, 'pilotstudy_id', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.pilotstudy_id)
//             })
//
//             it('should return a incomplete model for not pass all parameters', () => {
//                 const result: Patient = new Patient().fromJSON('')
//                 assert.propertyVal(result, 'birth_date', undefined)
//                 assert.propertyVal(result, 'email', undefined)
//                 assert.propertyVal(result, 'gender', undefined)
//                 assert.propertyVal(result, 'name', undefined)
//                 assert.propertyVal(result, 'pilotstudy_id', undefined)
//             })
//
//             it('should return a incomplete model for pass invalid json string', () => {
//                 const result: Patient = new Patient().fromJSON('invalid')
//                 assert.propertyVal(result, 'birth_date', undefined)
//                 assert.propertyVal(result, 'email', undefined)
//                 assert.propertyVal(result, 'gender', undefined)
//                 assert.propertyVal(result, 'name', undefined)
//                 assert.propertyVal(result, 'pilotstudy_id', undefined)
//             })
//         })
//     })
//
//     describe('toJSON()', () => {
//         it('should return a json with all parameters', () => {
//             const model: Patient = new Patient().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient)
//             const result = model.toJSON()
//             assert.propertyVal(result, 'birth_date', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.birth_date)
//             assert.propertyVal(result, 'email', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.email)
//             assert.propertyVal(result, 'gender', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.gender)
//             assert.propertyVal(result, 'name', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.name)
//             assert.propertyVal(result, 'pilotstudy_id', DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.patient.pilotstudy_id)
//         })
//     })
// })
