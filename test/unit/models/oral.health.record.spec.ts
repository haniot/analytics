import { OralHealthRecord } from '../../../src/application/domain/model/oral.health.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: OrealHealthRecord', () => {
    const data: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
                assert.deepPropertyVal(result, 'teeth_lesions', data.teeth_lesions)
                assert.propertyVal(result, 'teeth_brushing_freq', data.teeth_brushing_freq)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: OralHealthRecord = new OralHealthRecord().fromJSON({})
                assert.deepPropertyVal(result, 'teeth_lesions', undefined)
                assert.propertyVal(result, 'teeth_brushing_freq', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: OralHealthRecord =
                    new OralHealthRecord().fromJSON(JSON.stringify(DefaultEntityMock.ORAL_HEALTH_RECORD))
                assert.deepPropertyVal(result, 'teeth_lesions', data.teeth_lesions)
                assert.propertyVal(result, 'teeth_brushing_freq', data.teeth_brushing_freq)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: OralHealthRecord = new OralHealthRecord().fromJSON('')
                assert.deepPropertyVal(result, 'teeth_lesions', undefined)
                assert.propertyVal(result, 'teeth_brushing_freq', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: OralHealthRecord = new OralHealthRecord().fromJSON('invalid')
                assert.deepPropertyVal(result, 'teeth_lesions', undefined)
                assert.propertyVal(result, 'teeth_brushing_freq', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
            const result = model.toJSON()
            assert.deepPropertyVal(result, 'teeth_lesions', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions)
            assert.propertyVal(result, 'teeth_brushing_freq', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq)
        })
    })
})
