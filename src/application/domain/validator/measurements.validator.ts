import { ValidationException } from '../exception/validation.exception'
import { MeasurementTypes } from '../utils/measurement.types'
import { HeightMeasurementValidator } from './height.measurement.validator'
import { HeartRateMeasurementValidator } from './heart.rate.measurement.validator'
import { BloodPressureValidator } from './blood.pressure.validator'
import { WeightMeasurementValidator } from './weight.measurement.validator'
import { BloodGlucoseMeasurementValidator } from './blood.glucose.measurement.validator'
import { FatMeasurementValidator } from './fat.measurement.validator'
import { WaistCircumferenceMeasurementValidator } from './waist.circumference.measurement.validator'
import { BodyTemperatureMeasurementValidator } from './body.temperature.measurement.validator'
import { Strings } from '../../../utils/strings'

export class MeasurementsValidator {
    public static validate(measurements: Array<any>): void | ValidationException {
        measurements.forEach(item => {
            switch (item.type) {
                case MeasurementTypes.HEIGHT:
                    HeightMeasurementValidator.validate(item)
                    break
                case MeasurementTypes.HEART_RATE:
                    HeartRateMeasurementValidator.validate(item)
                    break
                case MeasurementTypes.BLOOD_PRESSURE:
                    BloodPressureValidator.validate(item)
                    break
                case MeasurementTypes.WEIGHT:
                    WeightMeasurementValidator.validate(item)
                    break
                case MeasurementTypes.BLOOD_GLUCOSE:
                    BloodGlucoseMeasurementValidator.validate(item)
                    break
                case MeasurementTypes.BODY_TEMPERATURE:
                    BodyTemperatureMeasurementValidator.validate(item)
                    break
                case MeasurementTypes.WAIST_CIRCUMFERENCE:
                    WaistCircumferenceMeasurementValidator.validate(item)
                    break
                case MeasurementTypes.FAT:
                    FatMeasurementValidator.validate(item)
                    break
                default:
                    throw new ValidationException(Strings.ENUM_VALIDATOR.NOT_MAPPED(`type: ${item.type}`),
                        Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC.concat())
                    break
            }
        })
    }
}
