import HttpStatus from 'http-status-codes'
import { controller, httpGet, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationService } from '../../application/port/nutrition.evaluation.service.interface'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { Query } from '../../infrastructure/repository/query/query'

@controller('/evaluations')
export class HomeController {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_SERVICE) private readonly _service: INutritionEvaluationService
    ) {
    }

    @httpGet('/')
    public async getAllNutritionalEvaluations(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: Array<any> = await this._service.getAll(new Query().fromJSON(req.query))
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
        return evaluations.map(evaluation => evaluation.toJSON())
    }
}
