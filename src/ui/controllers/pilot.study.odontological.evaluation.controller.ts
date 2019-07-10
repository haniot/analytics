import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPost, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { IOdontologicEvaluationService } from '../../application/port/odontologic.evaluation.service.interface'
import { OdontologicEvaluationRequest } from '../../application/domain/model/odontologic.evaluation.request'
import { MeasurementTypes } from '../../application/domain/utils/measurement.types'
import { HeightMeasurement } from '../../application/domain/model/height.measurement'
import { HeartRateMeasurement } from '../../application/domain/model/heart.rate.measurement'
import { BloodPressureMeasurement } from '../../application/domain/model/blood.pressure.measurement'
import { WeightMeasurement } from '../../application/domain/model/weight.measurement'
import { BloodGlucoseMeasurement } from '../../application/domain/model/blood.glucose.measurement'
import { BodyTemperatureMeasurement } from '../../application/domain/model/body.temperature.measurement'
import { WaistCircumferenceMeasurement } from '../../application/domain/model/waist.circumference.measurement'
import { FatMeasurement } from '../../application/domain/model/fat.measurement'
import { OdontologicEvaluation } from '../../application/domain/model/odontologic.evaluation'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'
import { Patient } from '../../application/domain/model/patient'
import { EvaluationTypes } from '../../application/domain/utils/evaluation.types'

@controller('/pilotstudies/:pilotstudy_id/odontological/evaluations')
export class PilotStudyOdontologicalEvaluationController {
    constructor(
        @inject(Identifier.ODONTOLOGIC_EVALUATION_SERVICE) private readonly _service: IOdontologicEvaluationService
    ) {
    }

    @httpPost('/')
    public async addOdontologicEvaluationFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const requests: Array<OdontologicEvaluationRequest> =
                req.body.map(item => {
                    const evaluation = new OdontologicEvaluationRequest().fromJSON(item)
                    if (!evaluation.patient) evaluation.patient = new Patient()
                    evaluation.pilotstudy_id = req.params.pilotstudy_id
                    if (!evaluation.measurements) evaluation.measurements = []
                    evaluation.measurements = item.measurements.map(measurement => this.jsonToModel(measurement))
                    return evaluation
                })
            const result: OdontologicEvaluation = await this._service.addEvaluation(requests)
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
    public async getAllOdontologicalEvaluationsFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ pilotstudy_id: req.params.pilotstudy_id })
            const result: Array<OdontologicEvaluation> = await this._service.getAll(query)
            const count: number =
                await this._service.count(new Query().fromJSON({
                    filters: {
                        pilotstudy_id: req.params.pilotstudy_id,
                        type: EvaluationTypes.ODONTOLOGIC
                    }
                }))
            res.setHeader('X-Total-Count', count)
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
    public async getOdontologicalEvaluationFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ pilotstudy_id: req.params.pilotstudy_id })
            const result: OdontologicEvaluation = await this._service.getById(req.params.evaluation_id, query)
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
    public async removeOdontologicalEvaluationFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            await this._service.removeEvaluation(req.params.pilotstudy_id, req.params.evaluation_id)
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        }
    }

    private toJSONView(item: OdontologicEvaluation | Array<OdontologicEvaluation>): object {
        if (item instanceof Array) return item.map(evaluation => {
            evaluation.pilotstudy_id = undefined
            return evaluation.toJSON()
        })
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
            Strings.NUTRITION_EVALUATION.NOT_FOUND,
            Strings.NUTRITION_EVALUATION.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
