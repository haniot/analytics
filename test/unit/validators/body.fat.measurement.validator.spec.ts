import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { BodyFatMeasurement } from '../../../src/application/domain/model/body.fat.measurement'
import { assert } from 'chai'
import { MeasurementTypes } from '../../../src/application/domain/utils/measurement.types'
import { BodyFatMeasurementValidator } from '../../../src/application/domain/validator/body.fat.measurement.validator'
import { Strings } from '../../../src/utils/strings'

describe('Validators: BodyFatMeasurementValidator', () => {
    const measurement: BodyFatMeasurement = new BodyFatMeasurement().fromJSON(DefaultEntityMock.BODY_FAT_MEASUREMENT)

    it('should return undefined when the validation was successful', () => {
        const result = BodyFatMeasurementValidator.validate(measurement)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does not pass value', () => {
            measurement.value = undefined
            try {
                BodyFatMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Body Fat Measurement validation: value required!')
            } finally {
                measurement.value = DefaultEntityMock.BODY_FAT_MEASUREMENT.value
            }
        })
        it('should throw an error for does not pass unit', () => {
            measurement.unit = undefined
            try {
                BodyFatMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Body Fat Measurement validation: unit required!')
            } finally {
                measurement.unit = DefaultEntityMock.BODY_FAT_MEASUREMENT.unit
            }
        })
        it('should throw an error for does not pass type', () => {
            measurement.type = undefined
            try {
                BodyFatMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Body Fat Measurement validation: type required!')
            }
        })
        it('should throw an error for does pass invalid type', () => {
            measurement.type = 'invalid'
            try {
                BodyFatMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ENUM_VALIDATOR.NOT_MAPPED.concat('type: invalid'))
                assert.propertyVal(err, 'description',
                    Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC.concat(Object.values(MeasurementTypes).join(', ').concat('.')))
            } finally {
                measurement.type = DefaultEntityMock.BODY_FAT_MEASUREMENT.type
            }
        })
        it('should throw an error for does not pass timestamp', () => {
            measurement.timestamp = undefined
            try {
                BodyFatMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Body Fat Measurement validation: timestamp required!')
            }
        })
        it('should throw an error for does pass invalid timestamp', () => {
            measurement.timestamp = '12-04-2012'
            try {
                BodyFatMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Datetime: 12-04-2012 is not in valid ISO 8601 format.')
                assert.propertyVal(err, 'description', 'Date must be in the format: yyyy-MM-dd\'T\'HH:mm:ssZ')
            } finally {
                measurement.timestamp = DefaultEntityMock.BODY_FAT_MEASUREMENT.timestamp
            }
        })
        it('should throw an error for does not pass device_id', () => {
            measurement.device_id = undefined
            try {
                BodyFatMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Body Fat Measurement validation: device_id required!')
            }
        })
        it('should throw an error for does pass invalid device_id', () => {
            measurement.device_id = '123'
            try {
                BodyFatMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            }
        })
    })
})
