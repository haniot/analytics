import { SociodemographicRecord } from '../../../src/application/domain/model/sociodemographic.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Models: SociodemographicRecord', () => {
    describe('fromJSON()', () => {
        context('when transform json to model', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: SociodemographicRecord =
                    new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.propertyVal(result, 'mother_scholarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity)
                assert.propertyVal(result, 'people_in_home', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: SociodemographicRecord =
                    new SociodemographicRecord().fromJSON({})
                assert.propertyVal(result, 'color_race', undefined)
                assert.propertyVal(result, 'mother_scholarity', undefined)
                assert.propertyVal(result, 'people_in_home', undefined)
            })
        })

        context('when pass a json as string', () => {
            it('should return a complete model for pass all parameters', () => {
                const result: SociodemographicRecord =
                    new SociodemographicRecord().fromJSON(JSON.stringify(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD))
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.propertyVal(result, 'mother_scholarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity)
                assert.propertyVal(result, 'people_in_home', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)
            })

            it('should return a incomplete model for not pass all parameters', () => {
                const result: SociodemographicRecord =
                    new SociodemographicRecord().fromJSON('')
                assert.propertyVal(result, 'color_race', undefined)
                assert.propertyVal(result, 'mother_scholarity', undefined)
                assert.propertyVal(result, 'people_in_home', undefined)
            })

            it('should return a incomplete model for pass invalid json string', () => {
                const result: SociodemographicRecord =
                    new SociodemographicRecord().fromJSON('invalid')
                assert.propertyVal(result, 'color_race', undefined)
                assert.propertyVal(result, 'mother_scholarity', undefined)
                assert.propertyVal(result, 'people_in_home', undefined)
            })
        })
    })

    describe('toJSON()', () => {
        it('should return a json with all parameters', () => {
            const model: SociodemographicRecord =
                new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
            const result = model.toJSON()
            assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
            assert.propertyVal(result, 'mother_scholarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity)
            assert.propertyVal(result, 'people_in_home', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)
        })
    })
})
