import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { expect } from 'chai'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { Strings } from '../../../src/utils/strings'
import { DataRepoModel } from '../../../src/infrastructure/database/schema/data.schema'
import { DIContainer } from '../../../src/di/di'
import { Default } from '../../../src/utils/default'

const dbConnection: IConnectionDB = DIContainer.get(Identifier.MONGODB_CONNECTION)
const app: App = DIContainer.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: PilotStudiesData', () => {
    before(async () => {
            try {
                await dbConnection.tryConnect(process.env.MONGODB_URI_TEST || Default.MONGODB_URI_TEST)
                await deleteAllDataRequest()
            } catch (err) {
                throw new Error('Failure on PilotStudiesData test: ' + err.message)
            }
        }
    )

    after(async () => {
        try {
            await deleteAllDataRequest()
            await dbConnection.dispose()
        } catch (err) {
            throw new Error('Failure on PilotStudiesData test: ' + err.message)
        }
    })

    describe('POST /v1/pilotstudies/:pilotstudy_id/data', () => {
        context('when want get the data from pilot study', () => {
            it('should return status code 202 and a message about request data', () => {
                const url: string = `/v1/pilotstudies/${DefaultEntityMock.NUTRITION_EVALUATION.pilotstudy_id}/data`
                return request
                    .post(url)
                    .send(DefaultEntityMock.DATA_REQUEST)
                    .set('Content-Type', 'application/json')
                    .expect(202)
                    .then(res => {
                        expect(res.body).to.have.property('status', 'pending')
                        expect(res.body).to.have.property('completion_estimate')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid parameters', () => {
                return request
                    .post('/v1/pilotstudies/123/data')
                    .send(DefaultEntityMock.DATA_REQUEST)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .catch(err => {
                        expect(err.body).to.have.property('message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                        expect(err.body).to.have.property('description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
                    })
            })
        })
    })

    describe('GET /v1/pilotstudies/:pilotstudy_id/data', () => {
        // It is necessary to raise the account, ehr and mhealth microservices to perform this test.
        // context('when get a list of data request from pilot study', () => {
        //     it('should return status code 200 and a list of data requests', () => {
        //         const url: string = `/v1/pilotstudies/${DefaultEntityMock.NUTRITION_EVALUATION.pilotstudy_id}/data`
        //         return request
        //             .get(url)
        //             .set('Content-Type', 'application/json')
        //             .expect(200)
        //             .then(res => {
        //                 expect(res.body).to.be.an.instanceof(Array)
        //                 expect(res.body).to.have.lengthOf(1)
        //                 validateBody(res.body[0])
        //             })
        //     })
        // })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid parameters', () => {
                return request
                    .get('/v1/pilotstudies/123/data')
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

async function deleteAllDataRequest() {
    return await DataRepoModel.deleteMany({})
}

// function validateBody(body) {
//     expect(body).to.have.property('id')
//     expect(body).to.have.property('created_at')
//     expect(body).to.have.property('total_patients', DefaultEntityMock.DATA.total_patients)
//     expect(body).to.have.property('file_csv')
//     expect(body).to.have.property('file_xls')
//     expect(body).to.have.deep.property('data_types', DefaultEntityMock.DATA.data_types)
//     expect(body).to.have.deep.property('patients', DefaultEntityMock.DATA.patients)
// }
