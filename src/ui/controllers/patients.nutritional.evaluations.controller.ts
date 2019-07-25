import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPost, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationService } from '../../application/port/nutrition.evaluation.service.interface'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { NutritionEvaluation } from '../../application/domain/model/nutrition.evaluation'
import { Query } from '../../infrastructure/repository/query/query'
import { NutritionEvaluationRequest } from '../../application/domain/model/nutrition.evaluation.request'
import { Strings } from '../../utils/strings'
import { ApiException } from '../exception/api.exception'
import { NutritionCouncil } from '../../application/domain/model/nutrition.council'
import { Patient } from '../../application/domain/model/patient'
import { EvaluationTypes } from '../../application/domain/utils/evaluation.types'

@controller('/v1/patients/:patient_id/nutritional/evaluations')
export class PatientsNutritionalEvaluationsController {
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
            const count: number =
                await this._service.count(new Query().fromJSON({
                    filters: {
                        'patient.id': req.params.patient_id,
                        'type': EvaluationTypes.NUTRITION
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

    private getMessageNotFound(): object {
        return new ApiException(
            HttpStatus.NOT_FOUND,
            Strings.ODONTOLOGIC_EVALUATION.NOT_FOUND,
            Strings.ODONTOLOGIC_EVALUATION.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
