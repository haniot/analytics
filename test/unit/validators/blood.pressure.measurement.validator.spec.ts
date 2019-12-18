import { BloodPressureMeasurement } from '../../../src/application/domain/model/blood.pressure.measurement'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { BloodPressureMeasurementValidator } from '../../../src/application/domain/validator/blood.pressure.measurement.validator'
import { assert } from 'chai'
import { Strings } from '../../../src/utils/strings'
import { MeasurementTypes } from '../../../src/application/domain/utils/measurement.types'

describe('Validators: BloodPressureMeasurementValidator', () => {
    const measurement: BloodPressureMeasurement = new BloodPressureMeasurement().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT)

    it('should return undefined when the validation was successful', () => {
        const result = BloodPressureMeasurementValidator.validate(measurement)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does not pass systolic', () => {
            measurement.systolic = undefined
            try {
                BloodPressureMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Pressure Measurement validation: systolic required!')
            } finally {
                measurement.systolic = DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.systolic
            }
        })
        it('should throw an error for does not pass diastolic', () => {
            measurement.diastolic = undefined
            try {
                BloodPressureMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Pressure Measurement validation: diastolic required!')
            } finally {
                measurement.diastolic = DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.diastolic
            }
        })
        it('should throw an error for does not pass unit', () => {
            measurement.unit = undefined
            try {
                BloodPressureMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Pressure Measurement validation: unit required!')
            } finally {
                measurement.unit = DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.unit
            }
        })
        it('should throw an error for does not pass type', () => {
            measurement.type = undefined
            try {
                BloodPressureMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Pressure Measurement validation: type required!')
            }
        })
        it('should throw an error for does pass invalid type', () => {
            const wrongMeasurement: BloodPressureMeasurement = new BloodPressureMeasurement().fromJSON({
                systolic: 121,
                diastolic: 78,
                pulse: 80,
                unit: 'mmHg',
                type: 'invalid',
                timestamp: '2018-11-19T14:40:00Z',
                device_id: '5ca790f77aefffa37a17b605'
            })
            try {
                BloodPressureMeasurementValidator.validate(wrongMeasurement)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ENUM_VALIDATOR.NOT_MAPPED.concat('type: invalid'))
                assert.propertyVal(err, 'description',
                    Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC.concat(Object.values(MeasurementTypes).join(', ').concat('.')))
            }
        })
        it('should throw an error for does not pass timestamp', () => {
            measurement.timestamp = undefined
            measurement.type = MeasurementTypes.BLOOD_PRESSURE
            try {
                BloodPressureMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Pressure Measurement validation: timestamp required!')
            }
        })
        it('should throw an error for does pass invalid timestamp', () => {
            measurement.timestamp = '12-04-2012'
            try {
                BloodPressureMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Datetime: 12-04-2012 is not in valid ISO 8601 format.')
                assert.propertyVal(err, 'description', 'Date must be in the format: yyyy-MM-dd\'T\'HH:mm:ssZ')
            } finally {
                measurement.timestamp = DefaultEntityMock.BLOOD_PRESSURE_MEASUREMENT.timestamp
            }
        })
        it('should throw an error for does not pass device_id', () => {
            measurement.device_id = undefined
            try {
                BloodPressureMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Blood Pressure Measurement validation: device_id required!')
            }
        })
        it('should throw an error for does pass invalid device_id', () => {
            measurement.device_id = '123'
            try {
                BloodPressureMeasurementValidator.validate(measurement)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            }
        })
    })
})
