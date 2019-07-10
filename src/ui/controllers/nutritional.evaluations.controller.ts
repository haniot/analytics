import HttpStatus from 'http-status-codes'
import { controller, httpGet, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationService } from '../../application/port/nutrition.evaluation.service.interface'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { Query } from '../../infrastructure/repository/query/query'
import { EvaluationTypes } from '../../application/domain/utils/evaluation.types'

@controller('/nutritional/evaluations')
export class NutritionalEvaluationsController {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_SERVICE) private readonly _service: INutritionEvaluationService
    ) {
    }

    @httpGet('/')
    public async getAllNutritionalEvaluations(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            const result: Array<any> = await this._service.getAll(query)
            const count: number = await this._service.count(new Query().fromJSON({ filters: { type: EvaluationTypes.NUTRITION } }))
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

    private toJSONView(evaluations: Array<any>): object {
        return evaluations.map(evaluation => {
            evaluation.health_professional_id = undefined
            evaluation.pilotstudy_id = undefined
            return evaluation.toJSON()
        })
    }
}
