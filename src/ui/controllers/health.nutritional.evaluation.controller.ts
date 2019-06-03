import HttpStatus from 'http-status-codes'
import { controller, httpGet, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationService } from '../../application/port/nutrition.evaluation.service.interface'
import { Request, Response } from 'express'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiExceptionManager } from '../exception/api.exception.manager'

@controller('/healthprofessionals/:healthprofessional_id/nutritional/evaluations')
export class HealthNutritionalEvaluationController {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_SERVICE) private readonly _service: INutritionEvaluationService
    ) {
    }

    @httpGet('/')
    public async getAllNutritionalEvaluationsFromHealthProfessional(@request() req: Request, @response() res: Response)
        : Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ health_professional_id: req.params.healthprofessional_id })
            const result: Array<any> = await this._service.getAll(query)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        } finally {
            req.query = {}
        }
    }

    private toJSONView(evaluations: Array<any>): object {
        return evaluations.map(evaluation => {
            evaluation.health_professional_id = undefined
            evaluation.pilotstudy_id = undefined
            return evaluation.toJSON()
        })
    }
}
