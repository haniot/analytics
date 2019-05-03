import HttpStatus from 'http-status-codes'
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationService } from '../../application/port/nutrition.evaluation.service.interface'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { NutritionEvaluation } from '../../application/domain/model/nutrition.evaluation'
import { Query } from '../../infrastructure/repository/query/query'
import { MeasurementTypes } from '../../application/domain/utils/measurement.types'
import { Height } from '../../application/domain/model/measurements/height'
import { HeartRate } from '../../application/domain/model/measurements/heart.rate'
import { BloodPressure } from '../../application/domain/model/measurements/blood.pressure'
import { Weight } from '../../application/domain/model/measurements/weight'
import { BloodGlucose } from '../../application/domain/model/measurements/blood.glucose'
import { BodyTemperature } from '../../application/domain/model/measurements/body.temperature'
import { WaistCircumference } from '../../application/domain/model/measurements/waist.circumference'
import { Fat } from '../../application/domain/model/measurements/fat'
import { EvaluationRequest } from '../../application/domain/model/evaluation.request'

@controller('/patients/{patient_id}/nutritional/evaluations')
export class PatientsNutritionEvaluationsController {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_SERVICE) private readonly _service: INutritionEvaluationService
    ) {
    }

    @httpPost('/')
    public async addNutritionalEvaluationFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            req.body.patient.id = req.params.patient_id
            const evaluation: EvaluationRequest = new EvaluationRequest().fromJSON(req.body)
            evaluation.measurements = req.body.measurements.map(item => this.jsonToModel(item))
            const result: NutritionEvaluation = await this._service.addEvaluation(evaluation)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        } finally {
            req.query = {}
        }
    }

    @httpGet('/')
    public async getAllNutritionalEvaluationsFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: Array<NutritionEvaluation> = await this._service.getAll(query)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        } finally {
            req.query = {}
        }
    }

    private toJSONView(item: NutritionEvaluation | Array<NutritionEvaluation>): object {
        if (item instanceof Array) return item.map(evaluation => evaluation.toJSON())
        return item.toJSON()
    }

    private jsonToModel(item: any): any {
        if (item.type) {
            switch (item.type) {
                case MeasurementTypes.HEIGHT:
                    return new Height().fromJSON(item)
                case MeasurementTypes.HEART_RATE:
                    return new HeartRate().fromJSON(item)
                case MeasurementTypes.BLOOD_PRESSURE:
                    return new BloodPressure().fromJSON(item)
                case MeasurementTypes.WEIGHT:
                    if (item.fat !== undefined) {
                        item.fat = {
                            ...item.fat,
                            ...{
                                device_id: item.device_id,
                                timestamp: item.timestamp,
                                user_id: item.user_id
                            }
                        }
                    }
                    return new Weight().fromJSON(item)
                case MeasurementTypes.BLOOD_GLUCOSE:
                    return new BloodGlucose().fromJSON(item)
                case MeasurementTypes.BODY_TEMPERATURE:
                    return new BodyTemperature().fromJSON(item)
                case MeasurementTypes.WAIST_CIRCUMFERENCE:
                    return new WaistCircumference().fromJSON(item)
                case MeasurementTypes.FAT:
                    return new Fat().fromJSON(item)
                default:
                    return item
            }
        }
        return undefined
    }
}
