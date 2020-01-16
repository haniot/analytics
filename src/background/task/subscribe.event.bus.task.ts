import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IEventBus } from '../../infrastructure/port/event.bus.interface'
import { ILogger } from '../../utils/custom.logger'
import { IBackgroundTask } from '../../application/port/background.task.interface'
import { UserDeleteEvent } from '../../application/integration-event/event/user.delete.event'
import { UserDeleteEventHandler } from '../../application/integration-event/handler/user.delete.event.handler'
import { DIContainer } from '../../di/di'
import { PilotStudyDeleteEvent } from '../../application/integration-event/event/pilot.study.delete.event'
import { PilotStudyDeleteEventHandler } from '../../application/integration-event/handler/pilot.study.delete.event.handler'
import { Default } from '../../utils/default'
import fs from 'fs'

@injectable()
export class SubscribeEventBusTask implements IBackgroundTask {
    constructor(
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public run(): void {
        // To use SSL/TLS, simply mount the uri with the amqps protocol and pass the CA.
        const rabbitUri = process.env.RABBITMQ_URI || Default.RABBITMQ_URI
        const rabbitOptions: any = { sslOptions: { ca: [] } }
        if (rabbitUri.indexOf('amqps') === 0) {
            rabbitOptions.sslOptions.ca = [fs.readFileSync(process.env.RABBITMQ_CA_PATH || Default.RABBITMQ_CA_PATH)]
        }
        // Before performing the subscribe is trying to connect to the bus.
        // If there is no connection, infinite attempts will be made until
        // the connection is established successfully. Once you have the
        // connection, event registration is performed.
        this._eventBus
            .connectionSub
            .open(rabbitUri, rabbitOptions)
            .then(() => {
                this._logger.info('Subscribe connection initialized successfully')
                this.initializeSubscribe()
            })
            .catch(err => {
                this._logger.error(`Could not open connection to subscribe to message bus, ${err.message}`)
            })
    }

    public async stop(): Promise<void> {
        try {
            await this._eventBus.dispose()
        } catch (err) {
            return Promise.reject(new Error(`Error stopping SubscribeEventBusTask! ${err.message}`))
        }
    }

    /**
     * Subscribe for all events.
     */
    private async initializeSubscribe(): Promise<void> {
        try {
            await this._eventBus.subscribe(
                new UserDeleteEvent(new Date()),
                new UserDeleteEventHandler(DIContainer.get(Identifier.NUTRITION_EVALUATION_REPOSITORY), this._logger),
                'users.delete'
            )
            this._logger.info('Subscribe in UserDeleteEvent successful!')
            await this._eventBus.subscribe(
                new PilotStudyDeleteEvent(new Date()),
                new PilotStudyDeleteEventHandler(DIContainer.get(Identifier.DATA_REPOSITORY), this._logger),
                'pilotstudies.delete'
            )
            this._logger.info('Subscribe in PilotStudyDeleteEvent successful!')
        } catch (err) {
            this._logger.error(`An error occurred while subscribing to events. ${err.message}`)
        }
    }
}
