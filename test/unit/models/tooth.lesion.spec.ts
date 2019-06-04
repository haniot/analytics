import { ToothLesion } from '../../../src/application/domain/model/tooth.lesion'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: ToothLesion', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: ToothLesion = new ToothLesion().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions[0])
                assert.propertyVal(result, 'lesion_type', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions[0].lesion_type)
                assert.propertyVal(result, 'tooth_type', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions[0].tooth_type)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: ToothLesion = new ToothLesion().fromJSON({})
                assert.propertyVal(result, 'lesion_type', undefined)
                assert.propertyVal(result, 'tooth_type', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: ToothLesion =
                    new ToothLesion().fromJSON(JSON.stringify(DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions[0]))
                assert.propertyVal(result, 'lesion_type', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions[0].lesion_type)
                assert.propertyVal(result, 'tooth_type', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions[0].tooth_type)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: ToothLesion = new ToothLesion().fromJSON('')
                assert.propertyVal(result, 'lesion_type', undefined)
                assert.propertyVal(result, 'tooth_type', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: ToothLesion = new ToothLesion().fromJSON('invalid')
                assert.propertyVal(result, 'lesion_type', undefined)
                assert.propertyVal(result, 'tooth_type', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: ToothLesion = new ToothLesion().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions[0])
            const result = model.toJSON()
            assert.propertyVal(result, 'lesion_type', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions[0].lesion_type)
            assert.propertyVal(result, 'tooth_type', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions[0].tooth_type)
        })
    })
})
