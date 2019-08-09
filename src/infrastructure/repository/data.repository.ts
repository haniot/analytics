import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { Data } from '../../application/domain/model/data'
import { DataEntity } from '../entity/data.entity'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { IDataRepository } from '../../application/port/data.repository.interface'
import { DataRequestParameters } from '../../application/domain/model/data.request.parameters'
import { IEventBus } from '../port/event.bus.interface'
import { ValidationException } from '../../application/domain/exception/validation.exception'
import { DateUtils } from '../../application/domain/utils/date.utils'
import { MeasurementTypes } from '../../application/domain/utils/measurement.types'

@injectable()
export class DataRepository extends BaseRepository<Data, DataEntity> implements IDataRepository {
    constructor(
        @inject(Identifier.DATA_REPO_MODEL) readonly _model: any,
        @inject(Identifier.DATA_ENTITY_MAPPER) readonly _mapper: IEntityMapper<Data, DataEntity>,
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_model, _mapper, _logger)
    }

    public async generateData(pilotId: string, dataRequest: DataRequestParameters): Promise<void> {
        try {
            this._eventBus.connectionRpcClient
                .open(0, 2000)
                .then(async (conn) => {
                    this._logger.info('Connection with RPC Client opened successful!')
                    try {
                        const pilotStudy: any = await this.getPilotStudy(pilotId)
                        const patientsList: Array<any> = pilotStudy.patients
                        patientsList.forEach(async patient => {
                            const measurements: any = await this.getMeasurementsFromPatient(patient.id)
                            const nutritionalQuestionnaire: any = await this.getNutritionalQuestionnairesFromPatient(patient.id)
                            nutritionalQuestionnaire
                            const odontologicalQuestionnaire: any = await this.getOdontologicalQuestionnairesFromPatient(patient.id)
                            odontologicalQuestionnaire

                            const result: any = {
                                ...this.generatePatientData(patient),
                                ...this.generateMeasurementData(measurements)
                            }

                            console.log('the data is', result)
                            conn.close().then(() => {
                                this._logger.info('Connection with RPC Client closed successful!')
                            }).catch(err => {
                                throw new Error(`Error at close the RPC Client connection: ${err.message}`)
                            })
                        })
                        // Se houver sucesso, solicitar ao mhealth as medições de cada paciente E
                        // solicitar no EHR os questionários de nutrição e odontológicos
                        // Se houver sucesso, montar o arquivo .xls e .csv, enviar para a AWS, salvar as referências no banco
                    } catch (err) {
                        throw new Error(`Error trying to generate data: ${err.message}`)
                    }
                }).catch(err => {
                throw new Error(`Error trying to get connection to Event Bus for RPC Client. ${err.message}`)
            })
        } catch (err) {
            this._logger.error(err.message)
        }
    }

    private async getPilotStudy(pilotId: string): Promise<any> {
        try {
            const result: any =
                await this._eventBus.executeResource('account.rpc', 'pilotstudies.findone', pilotId)
            this.validatePilotStudy(result)
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }

    }

    private validatePilotStudy(pilot: any): void | ValidationException {
        if (!pilot) throw new ValidationException('Pilot Study does not exists!')
        if (!pilot.patients || !pilot.patients.length) {
            throw new ValidationException('Pilot Study does not have associated patients!')
        }
    }

    private async getMeasurementsFromPatient(patientId: string): Promise<any> {
        try {
            const result: Array<any> = await this._eventBus.executeResource(
                'mhealth.rpc',
                'measurements.find',
                `?patient_id=${patientId}`)
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async getNutritionalQuestionnairesFromPatient(patientId: string): Promise<any> {
        try {
            const result: any = await this._eventBus.executeResource(
                'ehr.rpc',
                'nutritional.questionnaires.find',
                `?patient_id=${patientId}`)
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async getOdontologicalQuestionnairesFromPatient(patientId: string): Promise<any> {
        try {
            const result: any = await this._eventBus.executeResource(
                'ehr.rpc',
                'odontological.questionnaires.find',
                `?patient_id=${patientId}`)
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private generatePatientData(patient: any): any {
        const result: any = {}
        if (patient.gender) result.gender = patient.gender === 'male' ? 1 : 2
        if (patient.birth_date) result.age = DateUtils.getAgeFromBirthDate(patient.birth_date).age
        return result
    }

    private generateMeasurementData(measurements: Array<any>): any {
        const result: any = {}
        const height: any = measurements.filter(item => item.type === MeasurementTypes.HEIGHT)[0]
        if (height) result.height = height.value
        const waist: any = measurements.filter(item => item.type === MeasurementTypes.WAIST_CIRCUMFERENCE)[0]
        if (waist) result.waist_circumference = waist.value
        const weight: any = measurements.filter(item => item.type === MeasurementTypes.WEIGHT)[0]
        if (weight) result.weight = weight.value
        const bloodGlucose: any = measurements.filter(item => item.type === MeasurementTypes.BLOOD_GLUCOSE)[0]
        if (bloodGlucose) {
            result.blood_glucose_value = bloodGlucose.value
            result.blood_glucose_meal = ['preprandial', 'postprandial', 'fasting', 'casual', 'bedtime'].indexOf(bloodGlucose.meal) + 1
        }
        const bloodPressure: any = measurements.filter(item => item.type === MeasurementTypes.BLOOD_PRESSURE)[0]
        if (bloodPressure) {
            result.blood_pressure_systolic = bloodPressure.systolic
            result.blood_pressure_diastolic = bloodPressure.diastolic
            result.blood_pressure_pulse = bloodPressure.pulse
        }
        const bodyTemperature: any = measurements.filter(item => item.type === MeasurementTypes.BODY_TEMPERATURE)[0]
        if (bodyTemperature) result.body_temperature = bodyTemperature.value
        const bodyFat: any = measurements.filter(item => item.type === MeasurementTypes.BODY_FAT)[0]
        if (bodyFat) result.body_fat = bodyFat.value
        return result
    }
}
