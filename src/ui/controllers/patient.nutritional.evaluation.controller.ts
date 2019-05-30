import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPost, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationService } from '../../application/port/nutrition.evaluation.service.interface'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { NutritionEvaluation } from '../../application/domain/model/nutrition.evaluation'
import { Query } from '../../infrastructure/repository/query/query'
import { MeasurementTypes } from '../../application/domain/utils/measurement.types'
import { HeightMeasurement } from '../../application/domain/model/height.measurement'
import { HeartRateMeasurement } from '../../application/domain/model/heart.rate.measurement'
import { BloodPressureMeasurement } from '../../application/domain/model/blood.pressure.measurement'
import { WeightMeasurement } from '../../application/domain/model/weight.measurement'
import { BloodGlucoseMeasurement } from '../../application/domain/model/blood.glucose.measurement'
import { BodyTemperatureMeasurement } from '../../application/domain/model/body.temperature.measurement'
import { WaistCircumferenceMeasurement } from '../../application/domain/model/waist.circumference.measurement'
import { FatMeasurement } from '../../application/domain/model/fat.measurement'
import { NutritionEvaluationRequest } from '../../application/domain/model/nutrition.evaluation.request'
import { Strings } from '../../utils/strings'
import { ApiException } from '../exception/api.exception'
import { NutritionCouncil } from '../../application/domain/model/nutrition.council'
import { Patient } from '../../application/domain/model/patient'

@controller('/patients/:patient_id/nutritional/evaluations')
export class PatientNutritionalEvaluationController {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_SERVICE) private readonly _service: INutritionEvaluationService
    ) {
    }

    @httpPost('/')
    public async addNutritionalEvaluationFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const evaluation: NutritionEvaluationRequest = new NutritionEvaluationRequest().fromJSON(req.body)
            if (!evaluation.patient) evaluation.patient = new Patient()
            evaluation.patient.id = req.params.patient_id
            if (!evaluation.measurements) evaluation.measurements = []
            if (evaluation.measurements.length)
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
            query.addFilter({ 'patient.id': req.params.patient_id })
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

    @httpGet('/:evaluation_id')
    public async getNutritionalEvaluationFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ 'patient.id': req.params.patient_id })
            const result: NutritionEvaluation = await this._service.getById(req.params.evaluation_id, query)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        } finally {
            req.query = {}
        }
    }

    @httpDelete('/:evaluation_id')
    public async removeNutritionalEvaluationFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            await this._service.removeEvaluation(req.params.patient_id, req.params.evaluation_id)
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        }
    }

    @httpPost('/:evaluation_id/counselings')
    public async addNutritionalCounselingFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: NutritionEvaluation =
                await this._service.updateNutritionalCounseling(
                    req.params.patient_id,
                    req.params.evaluation_id,
                    new NutritionCouncil().fromJSON(req.body))
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        } finally {
            req.query = {}
        }
    }

    private toJSONView(item: NutritionEvaluation | Array<NutritionEvaluation>): object {
        if (item instanceof Array) return item.map(evaluation => {
            evaluation.health_professional_id = undefined
            evaluation.pilotstudy_id = undefined
            return evaluation.toJSON()
        })
        item.health_professional_id = undefined
        item.pilotstudy_id = undefined
        return item.toJSON()
    }

    private jsonToModel(item: any): any {
        if (item.type) {
            switch (item.type) {
                case MeasurementTypes.HEIGHT:
                    return new HeightMeasurement().fromJSON(item)
                case MeasurementTypes.HEART_RATE:
                    return new HeartRateMeasurement().fromJSON(item)
                case MeasurementTypes.BLOOD_PRESSURE:
                    return new BloodPressureMeasurement().fromJSON(item)
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
                    return new WeightMeasurement().fromJSON(item)
                case MeasurementTypes.BLOOD_GLUCOSE:
                    return new BloodGlucoseMeasurement().fromJSON(item)
                case MeasurementTypes.BODY_TEMPERATURE:
                    return new BodyTemperatureMeasurement().fromJSON(item)
                case MeasurementTypes.WAIST_CIRCUMFERENCE:
                    return new WaistCircumferenceMeasurement().fromJSON(item)
                case MeasurementTypes.FAT:
                    return new FatMeasurement().fromJSON(item)
                default:
                    return item
            }
        }
        return undefined
    }

    private getMessageNotFound(): object {
        return new ApiException(
            HttpStatus.NOT_FOUND,
            Strings.ODONTOLOGIC_EVALUATION.NOT_FOUND,
            Strings.ODONTOLOGIC_EVALUATION.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
