import HttpStatus from 'http-status-codes'
import { controller, httpGet, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationService } from '../../application/port/nutrition.evaluation.service.interface'
import { Request, Response } from 'express'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { EvaluationTypes } from '../../application/domain/utils/evaluation.types'
import { NutritionEvaluation } from '../../application/domain/model/nutrition.evaluation'
import { NutritionEvaluationList } from '../model/nutrition.evaluation.list'

@controller('/v1/pilotstudies/:pilotstudy_id/nutritional/evaluations')
export class PilotStudiesNutritionalEvaluationsController {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_SERVICE) private readonly _service: INutritionEvaluationService
    ) {
    }

    @httpGet('/')
    public async getAllNutritionalEvaluations(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ pilotstudy_id: req.params.pilotstudy_id })
            const result: Array<any> = await this._service.getAll(query)
            const count: number =
                await this._service.count(new Query().fromJSON({
                    filters: {
                        pilotstudy_id: req.params.pilotstudy_id,
                        type: EvaluationTypes.NUTRITION
                    }
                }))
            res.setHeader('X-Total-Count', count)
            return res.status(HttpStatus.OK).send(this.toJSONViewList(result))
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        } finally {
            req.query = {}
        }
    }

    private toJSONViewList(item: Array<NutritionEvaluation>): object {
        return item.map(evaluation => {
            const itemNew: NutritionEvaluationList = new NutritionEvaluationList().fromModel(evaluation)
            return itemNew.toJSON()
        })
    }
}
