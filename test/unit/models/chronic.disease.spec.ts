import { ChronicDisease } from '../../../src/application/domain/model/chronic.disease'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: ChronicDisease', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: ChronicDisease = new ChronicDisease().fromJSON(DefaultEntityMock.CHRONIC_DISEASE)
                assert.propertyVal(result, 'type', DefaultEntityMock.CHRONIC_DISEASE.type)
                assert.propertyVal(result, 'disease_history', DefaultEntityMock.CHRONIC_DISEASE.disease_history)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: ChronicDisease = new ChronicDisease().fromJSON({})
                assert.propertyVal(result, 'type', undefined)
                assert.propertyVal(result, 'disease_history', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: ChronicDisease = new ChronicDisease().fromJSON(JSON.stringify(DefaultEntityMock.CHRONIC_DISEASE))
                assert.propertyVal(result, 'type', DefaultEntityMock.CHRONIC_DISEASE.type)
                assert.propertyVal(result, 'disease_history', DefaultEntityMock.CHRONIC_DISEASE.disease_history)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: ChronicDisease = new ChronicDisease().fromJSON('')
                assert.propertyVal(result, 'type', undefined)
                assert.propertyVal(result, 'disease_history', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: ChronicDisease = new ChronicDisease().fromJSON('invalid')
                assert.propertyVal(result, 'type', undefined)
                assert.propertyVal(result, 'disease_history', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: ChronicDisease = new ChronicDisease().fromJSON(DefaultEntityMock.CHRONIC_DISEASE)
            const result = model.toJSON()
            assert.propertyVal(result, 'type', DefaultEntityMock.CHRONIC_DISEASE.type)
            assert.propertyVal(result, 'disease_history', DefaultEntityMock.CHRONIC_DISEASE.disease_history)
        })
    })
})
