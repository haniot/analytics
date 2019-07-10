import { MedicalRecord } from '../../../src/application/domain/model/medical.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: MedicalRecord', () => {
    const data: MedicalRecord = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: MedicalRecord = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
                assert.deepPropertyVal(result, 'chronic_diseases', data.chronic_diseases)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: MedicalRecord = new MedicalRecord().fromJSON({})
                assert.deepPropertyVal(result, 'chronic_diseases', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: MedicalRecord = new MedicalRecord().fromJSON(JSON.stringify(DefaultEntityMock.MEDICAL_RECORD))
                assert.deepPropertyVal(result, 'chronic_diseases', data.chronic_diseases)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: MedicalRecord = new MedicalRecord().fromJSON('')
                assert.deepPropertyVal(result, 'chronic_diseases', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: MedicalRecord = new MedicalRecord().fromJSON('invalid')
                assert.deepPropertyVal(result, 'chronic_diseases', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: MedicalRecord = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'chronic_diseases', DefaultEntityMock.MEDICAL_RECORD.chronic_diseases)
        })
    })
})
