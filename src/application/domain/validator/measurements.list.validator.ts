import { ValidationException } from '../exception/validation.exception'
import { MeasurementTypes } from '../utils/measurement.types'
import { BloodGlucoseMeasurementValidator } from './blood.glucose.measurement.validator'
import { BloodPressureMeasurementValidator } from './blood.pressure.measurement.validator'
import { BodyTemperatureMeasurementValidator } from './body.temperature.measurement.validator'
import { HeightMeasurementValidator } from './height.measurement.validator'
import { WaistCircumferenceMeasurementValidator } from './waist.circumference.measurement.validator'
import { WeightMeasurementValidator } from './weight.measurement.validator'
import { FatMeasurementValidator } from './fat.measurement.validator'
import { Strings } from '../../../utils/strings'

export class MeasurementsListValidator {
    public static validate(item: Array<any>): void | ValidationException {
        item.forEach(measurement => {
            switch (measurement.type) {
                case(MeasurementTypes.BLOOD_GLUCOSE):
                    BloodGlucoseMeasurementValidator.validate(measurement)
                    break
                case(MeasurementTypes.BLOOD_PRESSURE):
                    BloodPressureMeasurementValidator.validate(measurement)
                    break
                case(MeasurementTypes.BODY_TEMPERATURE):
                    BodyTemperatureMeasurementValidator.validate(measurement)
                    break
                case(MeasurementTypes.HEIGHT):
                    HeightMeasurementValidator.validate(measurement)
                    break
                case(MeasurementTypes.WAIST_CIRCUMFERENCE):
                    WaistCircumferenceMeasurementValidator.validate(measurement)
                    break
                case(MeasurementTypes.WEIGHT):
                    WeightMeasurementValidator.validate(measurement)
                    break
                case(MeasurementTypes.BODY_FAT):
                    FatMeasurementValidator.validate(measurement)
                    break
                default:
                    throw new ValidationException(
                        Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`type: ${measurement.type}`),
                        Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                            .concat(Object.values(MeasurementTypes).join(', ').concat('.')))
            }
        })
    }
}
