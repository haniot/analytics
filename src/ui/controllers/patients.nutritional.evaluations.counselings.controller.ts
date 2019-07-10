import HttpStatus from 'http-status-codes'
import { controller, httpPost, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { INutritionEvaluationService } from '../../application/port/nutrition.evaluation.service.interface'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { NutritionEvaluation } from '../../application/domain/model/nutrition.evaluation'
import { Strings } from '../../utils/strings'
import { ApiException } from '../exception/api.exception'
import { NutritionCouncil } from '../../application/domain/model/nutrition.council'

@controller('/patients/:patient_id/nutritional/evaluations/:evaluation_id/counselings')
export class PatientsNutritionalEvaluationsCounselingsController {
    constructor(
        @inject(Identifier.NUTRITION_EVALUATION_SERVICE) private readonly _service: INutritionEvaluationService
    ) {
    }

    @httpPost('/')
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
