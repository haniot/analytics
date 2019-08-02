import { NutritionEvaluationService } from '../../../src/application/service/nutrition.evaluation.service'
import { NutritionEvaluationRepositoryMock } from '../../mocks/repositories/nutrition.evaluation.repository.mock'
import { BloodPressurePerAgeHeightRepositoryMock } from '../../mocks/repositories/blood.pressure.per.age.height.repository.mock'
import { BloodPressurePerSysDiasRepositoryMock } from '../../mocks/repositories/blood.pressure.per.sys.dias.repository.mock'
import { BmiPerAgeRepositoryMock } from '../../mocks/repositories/bmi.per.age.repository.mock'
import { NutritionCounselingRepositoryMock } from '../../mocks/repositories/nutrition.counseling.repository.mock'
import { NutritionEvaluation } from '../../../src/application/domain/model/nutrition.evaluation'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { MeasurementTypes } from '../../../src/application/domain/utils/measurement.types'
import { HeightMeasurement } from '../../../src/application/domain/model/height.measurement'
import { BloodPressureMeasurement } from '../../../src/application/domain/model/blood.pressure.measurement'
import { WeightMeasurement } from '../../../src/application/domain/model/weight.measurement'
import { BloodGlucoseMeasurement } from '../../../src/application/domain/model/blood.glucose.measurement'
import { BodyTemperatureMeasurement } from '../../../src/application/domain/model/body.temperature.measurement'
import { WaistCircumferenceMeasurement } from '../../../src/application/domain/model/waist.circumference.measurement'
import { BodyFatMeasurement } from '../../../src/application/domain/model/body.fat.measurement'
import { assert } from 'chai'
import { Query } from '../../../src/infrastructure/repository/query/query'
import { Strings } from '../../../src/utils/strings'
import { NutritionEvaluationRequest } from '../../../src/application/domain/model/nutrition.evaluation.request'

const evaluation: NutritionEvaluation = new NutritionEvaluation().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION)
evaluation.id = DefaultEntityMock.NUTRITION_EVALUATION.id
evaluation.measurements = DefaultEntityMock.NUTRITION_EVALUATION.measurements.map(item => jsonToModel(item))

const evaluationRequest: NutritionEvaluationRequest =
    new NutritionEvaluationRequest().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST)
evaluationRequest.measurements = DefaultEntityMock.NUTRITION_EVALUATION_REQUEST.measurements.map(item => jsonToModel(item))

describe('Services: NutritionEvaluationService', () => {
    const service: NutritionEvaluationService = new NutritionEvaluationService(
        new NutritionEvaluationRepositoryMock(),
        new BloodPressurePerAgeHeightRepositoryMock(),
        new BloodPressurePerSysDiasRepositoryMock(),
        new BmiPerAgeRepositoryMock(),
        new NutritionCounselingRepositoryMock()
    )

    describe('add()', () => {
        context('when add a nutrition evaluation', () => {
            it('should return the saved evaluation', () => {
                return service.add(evaluation)
                    .then(res => {
                        validate(res)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should throw an error for invalid parameters', () => {
                return service.add(new NutritionEvaluation())
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Nutritional Evaluation validation: status, patient, ' +
                            'nutritional_status, overweight_indicator, blood_glucose, blood_pressure, measurements, ' +
                            'physical_activity_habits, feeding_habits_record, medical_record, sleep_habit required!')
                    })
            })
        })
    })

    describe('getAll()', () => {
        context('when get a collection of nutritional evaluations', () => {
            it('should return a list of evaluations', () => {
                return service.getAll(new Query())
                    .then(res => {
                        assert.isArray(res)
                        assert.lengthOf(res, 1)
                        validate(res[0])
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should throw an error for invalid pilotstudy_id', () => {
                const query: Query = new Query()
                query.addFilter({ pilotstudy_id: '123' })
                return service.getAll(query)
                    .catch(err => {
                        assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })

            it('should throw an error for invalid patient_id', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: '123' })
                return service.getAll(query)
                    .catch(err => {
                        assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })

            it('should throw an error for invalid health_professional_id', () => {
                const query: Query = new Query()
                query.addFilter({ health_professional_id: '123' })
                return service.getAll(query)
                    .catch(err => {
                        assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })
        })
    })

    describe('getById()', () => {
        context('when get a nutrition evaluation by id', () => {
            it('should return a unique evaluation', () => {
                return service.getById(evaluation.id!, new Query())
                    .then(res => {
                        validate(res)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should throw an error for invalid id', () => {
                return service.getById('123', new Query().fromJSON({ filters: { patient_id: '123' } }))
                    .catch(err => {
                        assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })

            it('should throw an error for invalid patient_id', () => {
                return service.getById(evaluation.id!, new Query().fromJSON({ filters: { patient_id: '123' } }))
                    .catch(err => {
                        assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })
        })
    })

    describe('remove()', () => {
        it('should throw an error for method not implemented', () => {
            try {
                return service.remove('')
            } catch (err) {
                assert.propertyVal(err, 'message', 'Not implemented!')
            }
        })
    })

    describe('update()', () => {
        it('should throw an error for method not implemented', () => {
            try {
                return service.update(evaluation)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Not implemented!')
            }
        })
    })

    describe('count()', () => {
        it('should return the quantity of nutritional evaluation', () => {
            return service.count(new Query())
                .then(res => {
                    assert.isNumber(res)
                    assert.equal(res, 1)
                })
        })
    })

    describe('addEvaluation()', () => {
        context('when add a new nutritional evaluation', () => {
            it('should return the saved evaluation', () => {
                evaluationRequest.patient!.id = DefaultEntityMock.NUTRITION_EVALUATION.patient.id
                return service.addEvaluation(evaluationRequest)
                    .then(res => {
                        validate(res)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should throw an error for invalid parameters', () => {
                return service.addEvaluation(new NutritionEvaluationRequest())
                    .catch(err => {
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Nutrition Evaluation Request validation: patient, ' +
                            'measurements, physical_activity_habits, feeding_habits_record, medical_record, health_professional_id, ' +
                            'pilotstudy_id required!')
                    })
            })
        })
    })

    describe('updateNutritionalCounseling()', () => {
        context('when update the nutritional counseling from nutritional evaluation', () => {
            it('should return the updated evaluation', () => {
                return service.updateNutritionalCounseling(evaluation.patient!.id!, evaluation.id!, evaluation.counseling!.definitive!)
                    .then(res => {
                        validate(res)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should throw an error for invalid parameters', () => {
                return service.updateNutritionalCounseling('123', '123', evaluation.counseling!.definitive!)
                    .catch(err => {
                        assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })
        })
    })

    describe('removeEvaluation()', () => {
        context('when remove a nutritional evaluation', () => {
            it('should return true', () => {
                return service.removeEvaluation(evaluation.patient!.id!, evaluation.id!)
                    .then(res => {
                        assert.isTrue(res)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should throw an error for invalid parameters', () => {
                return service.removeEvaluation('123', '123')
                    .catch(err => {
                        assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })
        })
    })
})

function validate(model) {
    assert.propertyVal(model, 'id', evaluation.id)
    assert.propertyVal(model, 'type', evaluation.type)
    assert.deepPropertyVal(model, 'patient', evaluation.patient)
    assert.deepPropertyVal(model, 'nutritional_status', evaluation.nutritional_status)
    assert.deepPropertyVal(model, 'overweight_indicator', evaluation.overweight_indicator)
    assert.deepPropertyVal(model, 'taylor_cut_point', evaluation.taylor_cut_point)
    assert.deepPropertyVal(model, 'blood_glucose', evaluation.blood_glucose)
    assert.deepPropertyVal(model, 'blood_pressure', evaluation.blood_pressure)
    assert.deepPropertyVal(model, 'counseling', evaluation.counseling)
    assert.deepPropertyVal(model, 'physical_activity_habits', evaluation.physical_activity_habits)
    assert.deepPropertyVal(model, 'feeding_habits_record', evaluation.feeding_habits_record)
    assert.deepPropertyVal(model, 'medical_record', evaluation.medical_record)
}

function jsonToModel(item: any): any {
    if (item.type) {
        switch (item.type) {
            case MeasurementTypes.HEIGHT:
                return new HeightMeasurement().fromJSON(item)
            case MeasurementTypes.BLOOD_PRESSURE:
                return new BloodPressureMeasurement().fromJSON(item)
            case MeasurementTypes.WEIGHT:
                return new WeightMeasurement().fromJSON(item)
            case MeasurementTypes.BLOOD_GLUCOSE:
                return new BloodGlucoseMeasurement().fromJSON(item)
            case MeasurementTypes.BODY_TEMPERATURE:
                return new BodyTemperatureMeasurement().fromJSON(item)
            case MeasurementTypes.WAIST_CIRCUMFERENCE:
                return new WaistCircumferenceMeasurement().fromJSON(item)
            case MeasurementTypes.BODY_FAT:
                return new BodyFatMeasurement().fromJSON(item)
            default:
                return item
        }
    }
    return undefined
}
