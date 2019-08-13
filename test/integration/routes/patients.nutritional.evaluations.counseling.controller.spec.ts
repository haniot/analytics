import { NutritionEvaluationRepoModel } from '../../../src/infrastructure/database/schema/nutrition.evaluation.schema'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { NutritionEvaluation } from '../../../src/application/domain/model/nutrition.evaluation'
import { expect } from 'chai'
import { ObjectId } from 'bson'
import { Strings } from '../../../src/utils/strings'
import { DIContainer } from '../../../src/di/di'

const dbConnection: IConnectionDB = DIContainer.get(Identifier.MONGODB_CONNECTION)
const app: App = DIContainer.get(Identifier.APP)
const request = require('supertest')(app.getExpress())
const evaluation: NutritionEvaluation = new NutritionEvaluation().fromJSON(DefaultEntityMock.NUTRITION_EVALUATION)

describe('Routes: PatientsNutritionalEvaluationsCounseling', () => {
    before(async () => {
            try {
                await dbConnection.tryConnect(0, 500)
                await deleteAllNutritionalEvaluations()
                await createNutritionalEvaluation().then(res => evaluation.id = res.id)
            } catch (err) {
                throw new Error('Failure on PatientsNutritionalEvaluationsCounseling test: ' + err.message)
            }
        }
    )

    after(async () => {
        try {
            await deleteAllNutritionalEvaluations()
            await dbConnection.dispose()
        } catch (err) {
            throw new Error('Failure on PatientsNutritionalEvaluationsCounseling test: ' + err.message)
        }
    })

    describe('POST /v1/patients/:patient_id/nutritional/evaluations/:evaluation_id/counselings', () => {
        context('when want get a nutrition evaluation from pilot study', () => {
            it('should return status code 200 and a unique evaluation', () => {
                const url: string = `/v1/patients/${DefaultEntityMock.NUTRITION_EVALUATION.patient.id}/` +
                    `nutritional/evaluations/${evaluation.id}/counselings`
                return request
                    .post(url)
                    .send({
                        bmi_whr: ['Eat more vegetables and less candy.'],
                        glycemia: ['Reduce the sugar consume and consume more fruits.'],
                        blood_pressure: ['Reduce the salt consume and consume less meat.']
                    })
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
                    .post(`/v1/patients/${new ObjectId()}/nutritional/evaluations/${new ObjectId()}/counselings`)
                    .send({
                        bmi_whr: ['Eat more vegetables and less candy.'],
                        glycemia: ['Reduce the sugar consume and consume more fruits.'],
                        blood_pressure: ['Reduce the salt consume and consume less meat.']
                    })
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
                    .post('/v1/patients/123/nutritional/evaluations/123/counselings')
                    .send({
                        bmi_whr: ['Eat more vegetables and less candy.'],
                        glycemia: ['Reduce the sugar consume and consume more fruits.'],
                        blood_pressure: ['Reduce the salt consume and consume less meat.']
                    })
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

function validateBodyComplete(body) {
    expect(body).to.have.property('status', 'complete')
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
