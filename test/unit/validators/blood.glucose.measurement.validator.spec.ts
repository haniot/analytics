import { BloodGlucoseMeasurement } from '../../../src/application/domain/model/blood.glucose.measurement'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { BloodGlucoseMeasurementValidator } from '../../../src/application/domain/validator/blood.glucose.measurement.validator'
import { MealTypes } from '../../../src/application/domain/utils/meal.types'
import { Strings } from '../../../src/utils/strings'
import { MeasurementTypes } from '../../../src/application/domain/utils/measurement.types'

describe('Validators: BloodGlucoseMeasurementValidator', () => {
    const measurement: BloodGlucoseMeasurement = new BloodGlucoseMeasurement().fromJSON(DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT)

    it('should return undefined when the validation was successful', () => {
        const result = BloodGlucoseMeasurementValidator.validate(measurement)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does not pass value', () => {
            measurement.value = undefined
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)

            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Glucose Measurement validation: value required!')
            } finally {
                measurement.value = DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.value
            }
        })
        it('should throw an error for does not pass unit', () => {
            measurement.unit = undefined
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Glucose Measurement validation: unit required!')
            } finally {
                measurement.unit = DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.unit
            }
        })
        it('should throw an error for does not pass meal', () => {
            measurement.meal = undefined
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Glucose Measurement validation: meal required!')
            }
        })
        it('should throw an error for does pass invalid meal', () => {
            measurement.meal = 'invalid'
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ENUM_VALIDATOR.NOT_MAPPED.concat('meal: invalid'))
                assert.propertyVal(err, 'description',
                    Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC.concat(Object.values(MealTypes).join(', ').concat('.')))
            } finally {
                measurement.meal = DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.meal
            }
        })
        it('should throw an error for does not pass type', () => {
            measurement.type = undefined
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Glucose Measurement validation: type required!')
            }
        })
        it('should throw an error for does pass invalid type', () => {
            measurement.type = 'invalid'
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ENUM_VALIDATOR.NOT_MAPPED.concat('type: invalid'))
                assert.propertyVal(err, 'description',
                    Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC.concat(Object.values(MeasurementTypes).join(', ').concat('.')))
            } finally {
                measurement.type = DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.type
            }
        })
        it('should throw an error for does not pass timestamp', () => {
            measurement.timestamp = undefined
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Glucose Measurement validation: timestamp required!')
            }
        })
        it('should throw an error for does pass invalid timestamp', () => {
            measurement.timestamp = '12-04-2012'
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Datetime: 12-04-2012 is not in valid ISO 8601 format.')
                assert.propertyVal(err, 'description', 'Date must be in the format: yyyy-MM-dd\'T\'HH:mm:ssZ')
            } finally {
                measurement.timestamp = DefaultEntityMock.BLOOD_GLUCOSE_MEASUREMENT.timestamp
            }
        })
        it('should throw an error for does not pass device_id', () => {
            measurement.device_id = undefined
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Glucose Measurement validation: device_id required!')
            }
        })
        it('should throw an error for does pass invalid device_id', () => {
            measurement.device_id = '123'
            try {
                BloodGlucoseMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            }
        })
    })
})
