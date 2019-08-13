import { inject } from 'inversify'
import { Identifier } from '../../../di/identifiers'
import { IIntegrationEventHandler } from './integration.event.handler.interface'
import { ILogger } from '../../../utils/custom.logger'
import { UserDeleteEvent } from '../event/user.delete.event'
import { IDataRepository } from '../../port/data.repository.interface'
import { PilotStudy } from '../../domain/model/pilot.study'
import { PilotStudyDeleteEvent } from '../event/pilot.study.delete.event'
import { PilotStudyValidator } from '../../domain/validator/pilot.study.validator'

export class PilotStudyDeleteEventHandler implements IIntegrationEventHandler<UserDeleteEvent> {
    constructor(
        @inject(Identifier.DATA_REPOSITORY) private readonly _dataRepository: IDataRepository,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public async handle(event: PilotStudyDeleteEvent): Promise<void> {
        try {
            const pilot: PilotStudy = new PilotStudy().fromJSON(event.pilot_study)
            PilotStudyValidator.validate(pilot)
            this._logger.info(`Prepare to delete data from pilot: ${pilot.id}...`)
            await this._dataRepository.removeDataFromPilotStudy(pilot.id!)
            this._logger.info(`Action for event ${event.event_name} successfully performed!`)
        } catch (err) {
            this._logger.warn(`An error occurred while attempting `
                .concat(`perform the operation with the ${event.event_name} name event. ${err.message}`)
                .concat(err.description ? ' ' + err.description : ''))
        }
    }
}
