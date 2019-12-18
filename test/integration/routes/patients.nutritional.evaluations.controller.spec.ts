import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { NutritionEvaluationRepoModel } from '../../../src/infrastructure/database/schema/nutrition.evaluation.schema'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { expect } from 'chai'
import { Strings } from '../../../src/utils/strings'
import { NutritionEvaluation } from '../../../src/application/domain/model/nutrition.evaluation'
import { ObjectId } from 'bson'
import { DIContainer } from '../../../src/di/di'
import { Default } from '../../../src/utils/default'

const dbConnection: IConnectionDB = DIContainer.get(Identifier.MONGODB_CONNECTION)
const app: App = DIContainer.get(Identifier.APP)
const request = require('supertest')(app.getExpress())
const evaluation: NutritionEvaluation = new NutritionEvaluation().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION)

describe('Routes:PatientsNutritionalEvaluation', () => {
    before(async () => {
            try {
                await dbConnection.tryConnect(process.env.MONGODB_URI_TEST || Default.MONGODB_URI_TEST)
                await deleteAllNutritionalEvaluations()
            } catch (err) {
                throw new Error('Failure on PatientsNutritionalEvaluation test: ' + err.message)
            }
        }
    )

    after(async () => {
        try {
            await deleteAllNutritionalEvaluations()
            await dbConnection.dispose()
        } catch (err) {
            throw new Error('Failure on PatientsNutritionalEvaluation test: ' + err.message)
        }
    })

    describe('POST /v1/patients/:patient_id/nutritional/evaluations', () => {
        context('when save a nutritional evaluation', () => {
            it('should return the saved evaluation', () => {
                return request
                    .post(`/v1/patients/${DefaultEntityMock.NUTRITION_EVALUATION.patient.id}/nutritional/evaluations`)
                    .send(DefaultEntityMock.NUTRITION_EVALUATION_REQUEST)
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                        validateBodyComplete(res.body)
                        evaluation.id = res.body.id
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message for does not pass patient information', () => {
                return request
                    .post(`/v1/patients/${DefaultEntityMock.NUTRITION_EVALUATION.patient.id}/nutritional/evaluations`)
                    .send({ ...DefaultEntityMock.NUTRITION_EVALUATION_REQUEST, patient: undefined })
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(err => {
                        expect(err.body).to.have.property('message', 'Required fields were not provided...')
                        expect(err.body).to.have.property('description', 'Patient validation: name, gender, birth_date' +
                            ' is required!')
                    })
            })
            it('should return status code 400 and message for does not pass measurements', () => {
                return request
                    .post(`/v1/patients/${DefaultEntityMock.NUTRITION_EVALUATION.patient.id}/nutritional/evaluations`)
                    .send({ ...DefaultEntityMock.NUTRITION_EVALUATION_REQUEST, measurements: undefined })
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(err => {
                        expect(err.body).to.have.property('message', 'Required fields were not provided...')
                        expect(err.body).to.have.property('description', 'Nutrition Evaluation Request validation:' +
                            ' measurements required!')
                    })
            })
            it('should return status code 400 and message for invalid patient_id', () => {
                return request
                    .post('/v1/patients/123/nutritional/evaluations')
                    .send({ ...DefaultEntityMock.NUTRITION_EVALUATION_REQUEST, patient: undefined })
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(err => {
                        expect(err.body).to.have.property('message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        expect(err.body).to.have.property('description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })
        })
    })

    describe('GET /v1/patients/:patient_id/nutritional/evaluations', () => {
        context('when want get a list of nutrition evaluations from pilot study', () => {
            it('should return status code 200 and a list of evaluations', () => {
                const url: string = `/v1/patients/${DefaultEntityMock.NUTRITION_EVALUATION.patient.id}/nutritional/evaluations`
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
                    .get(`/v1/patients/${new ObjectId()}/nutritional/evaluations`)
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
                    .get('/v1/patients/123/nutritional/evaluations')
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .catch(err => {
                        expect(err.body).to.have.property('message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        expect(err.body).to.have.property('description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })
        })
    })

    describe('GET /v1/patients/:patient_id/nutritional/evaluations/:evaluation_id', () => {
        context('when want get a nutrition evaluation from pilot study', () => {
            it('should return status code 200 and a unique evaluation', () => {
                const url: string = `/v1/patients/${DefaultEntityMock.NUTRITION_EVALUATION.patient.id}/` +
                    `nutritional/evaluations/${evaluation.id}`
                return request
                    .get(url)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        validateBodyComplete(res.body)
                    })
            })
        })

        context('when the evaluation does not exists', () => {
            it('should return status code 404 and message from does not exists evaluation', () => {
                return request
                    .get(`/v1/patients/${new ObjectId()}/nutritional/evaluations/${new ObjectId()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message', Strings.NUTRITION_EVALUATION.NOT_FOUND)
                        expect(res.body).to.have.property('description', Strings.NUTRITION_EVALUATION.NOT_FOUND_DESCRIPTION)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid parameters', () => {
                return request
                    .get('/v1/patients/123/nutritional/evaluations/123')
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .catch(err => {
                        expect(err.body).to.have.property('message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        expect(err.body).to.have.property('description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })
        })
    })

    describe('DELETE /v1/patients/:patient_id/nutritional/evaluations/:evaluation_id', () => {
        context('when want remove a nutrition evaluation from pilot study', () => {
            it('should return status code 204 and no content', () => {
                const url: string = `/v1/patients/${DefaultEntityMock.NUTRITION_EVALUATION.patient.id}/` +
                    `nutritional/evaluations/${evaluation.id}`
                return request
                    .delete(url)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })

        context('when the evaluation does not exists', () => {
            it('should return status code 204 and no content', () => {
                return request
                    .delete(`/v1/patients/${new ObjectId()}/nutritional/evaluations/${new ObjectId()}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid parameters', () => {
                return request
                    .delete('/v1/patients/123/nutritional/evaluations/123')
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

async function deleteAllNutritionalEvaluations() {
    return await NutritionEvaluationRepoModel.deleteMany({})
}

function validateBodyComplete(body) {
    expect(body).to.have.property('status', DefaultEntityMock.NUTRITION_EVALUATION.status)
    expect(body).to.have.property('created_at')
    expect(body).to.have.deep.property('patient', DefaultEntityMock.NUTRITION_EVALUATION.patient)
    expect(body).to.have.deep.property('nutritional_status', DefaultEntityMock.NUTRITION_EVALUATION.nutritional_status)
    expect(body).to.have.deep.property('overweight_indicator', DefaultEntityMock.NUTRITION_EVALUATION.overweight_indicator)
    expect(body).to.have.deep.property('taylor_cut_point', DefaultEntityMock.NUTRITION_EVALUATION.taylor_cut_point)
    expect(body).to.have.deep.property('blood_glucose', DefaultEntityMock.NUTRITION_EVALUATION.blood_glucose)
    expect(body).to.have.deep.property('blood_pressure', DefaultEntityMock.NUTRITION_EVALUATION.blood_pressure)
    expect(body).to.have.deep.property('counseling')
    expect(body).to.have.deep.property('measurements', DefaultEntityMock.NUTRITION_EVALUATION.measurements)
    expect(body).to.have.deep.property('physical_activity_habits', DefaultEntityMock.NUTRITION_EVALUATION.physical_activity_habits)
    expect(body).to.have.deep.property('feeding_habits_record', DefaultEntityMock.NUTRITION_EVALUATION.feeding_habits_record)
    expect(body).to.have.deep.property('medical_record', DefaultEntityMock.NUTRITION_EVALUATION.medical_record)
    expect(body).to.have.deep.property('sleep_habit', DefaultEntityMock.NUTRITION_EVALUATION.sleep_habit)
}

function validateBody(body) {
    expect(body).to.have.property('status', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.status)
    expect(body).to.have.property('created_at')
    expect(body).to.have.deep.property('patient', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.patient)
    expect(body).to.have.property('nutritional_status', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.nutritional_status)
    expect(body).to.have.property('overweight_indicator', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.overweight_indicator)
    expect(body).to.have.property('taylor_cut_point', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.taylor_cut_point)
    expect(body).to.have.property('blood_glucose', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.blood_glucose)
    expect(body).to.have.property('blood_pressure', DefaultEntityMock.NUTRITION_EVALUATION_RESUME.blood_pressure)
}
