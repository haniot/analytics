import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { expect } from 'chai'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { NutritionEvaluationRepoModel } from '../../../src/infrastructure/database/schema/nutrition.evaluation.schema'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { ObjectId } from 'bson'
import { Strings } from '../../../src/utils/strings'
import { DIContainer } from '../../../src/di/di'

const dbConnection: IConnectionDB = DIContainer.get(Identifier.MONGODB_CONNECTION)
const app: App = DIContainer.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: PilotStudiesNutritionalEvaluation', () => {
    before(async () => {
            try {
                await dbConnection.tryConnect(0, 500)
                await deleteAllNutritionalEvaluations()
                await createNutritionalEvaluation().then()
            } catch (err) {
                throw new Error('Failure on PilotStudiesNutritionalEvaluation test: ' + err.message)
            }
        }
    )

    after(async () => {
        try {
            await deleteAllNutritionalEvaluations()
            await dbConnection.dispose()
        } catch (err) {
            throw new Error('Failure on PilotStudiesNutritionalEvaluation test: ' + err.message)
        }
    })

    describe('GET /v1/pilotstudies/:pilotstudy_id/nutritional/evaluations', () => {
        context('when want get a list of nutrition evaluations from pilot study', () => {
            it('should return status code 200 and a list of evaluations', () => {
                const url: string = `/v1/pilotstudies/${DefaultEntityMock.NUTRITION_EVALUATION.pilotstudy_id}/` +
                    'nutritional/evaluations'
                return request
                    .get(url)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an.instanceof(Array)
                        expect(res.body).to.have.lengthOf(1)
                        validateBody(res.body[0])
                    })
            })
        })

        context('when there no are evaluations', () => {
            it('should return status code 200 and a empty list', () => {
                return request
                    .get(`/v1/pilotstudies/${new ObjectId()}/nutritional/evaluations`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an.instanceof(Array)
                        expect(res.body).to.have.lengthOf(0)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid parameters', () => {
                return request
                    .get('/v1/pilotstudies/123/nutritional/evaluations')
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .catch(err => {
                        expect(err.body).to.have.property('message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        expect(err.body).to.have.property('description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })
        })
    })
})

async function createNutritionalEvaluation() {
    return NutritionEvaluationRepoModel.create(DefaultEntityMock.NUTRITION_EVALUATION)
}

async function deleteAllNutritionalEvaluations() {
    return await NutritionEvaluationRepoModel.deleteMany({})
}

function validateBody(body) {
    expect(body).to.have.property('status', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.status)
    expect(body).to.have.property('created_at', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.created_at)
    expect(body).to.have.deep.property('patient', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.patient)
    expect(body).to.have.property('nutritional_status', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.nutritional_status)
    expect(body).to.have.property('overweight_indicator', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.overweight_indicator)
    expect(body).to.have.property('taylor_cut_point', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.taylor_cut_point)
    expect(body).to.have.property('blood_glucose', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.blood_glucose)
    expect(body).to.have.property('blood_pressure', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.blood_pressure)
}
