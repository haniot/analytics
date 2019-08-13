import HttpStatus from 'http-status-codes'
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { IDataService } from '../../application/port/data.service.interface'
import { Data } from '../../application/domain/model/data'
import { Query } from '../../infrastructure/repository/query/query'
import { DataRequestParameters } from '../../application/domain/model/data.request.parameters'

@controller('/v1/pilotstudies/:pilotstudy_id/data')
export class PilotStudiesDataController {
    constructor(
        @inject(Identifier.DATA_SERVICE) private readonly _service: IDataService
    ) {
    }

    @httpPost('/')
    public async requestPilotStudyData(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: Data = await this._service.requestData(req.params.pilotstudy_id,
                new DataRequestParameters().fromJSON(req.body),
                req.headers.authorization ? req.headers.authorization.split(' ')[1] : '')
            return res.status(HttpStatus.ACCEPTED).send(result)
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        }
    }

    @httpGet('/')
    public async getAllEvaluationDataFromUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ pilotstudy_id: req.params.pilotstudy_id })
            const result: Array<Data> = await this._service.getAll(query)
            const count: number =
                await this._service.count(new Query().fromJSON({ filters: { pilotstudy_id: req.params.pilotstudy_id } }))
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

    private toJSONView(item: Data | Array<Data>): object {
        if (item instanceof Array) return item.map(evaluation => this.toJSONView(evaluation))
        item.pilotstudy_id = undefined
        return item.toJSON()
    }
}
