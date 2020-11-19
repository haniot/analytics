import { inject, injectable } from 'inversify'
import { Identifier } from '../di/identifiers'
import { ILogger } from '../utils/custom.logger'
import { IConnectionDB } from '../infrastructure/port/connection.db.interface'
import { IBackgroundTask } from '../application/port/background.task.interface'
import { IEventBus } from '../infrastructure/port/event.bus.interface'
import { Config } from '../utils/config'

@injectable()
export class BackgroundService {

    constructor(
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.SUBSCRIBE_EVENT_BUS_TASK) private readonly _subscribeTask: IBackgroundTask,
        @inject(Identifier.MONGODB_CONNECTION) private readonly _mongodb: IConnectionDB,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public async startServices(): Promise<void> {
        try {
            /**
             * Trying to connect to mongodb.
             * Go ahead only when the run is resolved.
             * Since the application depends on the database connection to work.
             */
            const dbConfigs = Config.getMongoConfig()
            await this._mongodb.tryConnect(dbConfigs.uri, dbConfigs.options)

            // Opens RabbitMQ connections to perform tasks
            this._startTasks()
        } catch (err) {
            return Promise.reject(new Error(`Error initializing services in background! ${err.message}`))
        }
    }

    public async stopServices(): Promise<void> {
        try {
            await this._mongodb.dispose()
            await this._subscribeTask.stop()
        } catch (err) {
            return Promise.reject(new Error(`Error stopping services in background! ${err.message}`))
        }
    }

    private _startTasks(): void {
        const rabbitConfigs = Config.getRabbitConfig()
        this._eventBus
            .connectionSub
            .open(rabbitConfigs.uri, rabbitConfigs.options)
            .then((conn) => {
                this._logger.info('Connection with subscribe event opened successful!')
                this._subscribeTask.run()

                // When the connection has been lost
                conn.on('reestablished', () => {
                    this._logger.info('Connection with subscribe event reopened successful!')
                })
            })
            .catch(err => {
                this._logger.error(`Error trying to get connection to Event Bus for event subscribing. ${err.message}`)
            })

        this._eventBus
            .connectionPub
            .open(rabbitConfigs.uri, rabbitConfigs.options)
            .then((conn) => {
                this._logger.info('Connection with publish opened successful!')

                conn.on('reestablished', () => {
                    this._logger.info('Connection with publish reopened successful!')
                })
            })
            .catch(err => {
                this._logger.error(`Error trying to get connection to Event Bus for publish. ${err.message}`)
            })
    }
}
