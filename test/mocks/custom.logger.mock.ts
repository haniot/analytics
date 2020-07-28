import { ILogger } from '../../src/utils/custom.logger'

export class CustomLoggerMock implements ILogger {
    private _logger: any

    constructor() {
        this._logger = {
            add: {},
            debug: (message: string | object) => message,
            error: (message: string | object) => message,
            info: (message: string | object) => message,
            warn: (message: string | object) => message
        }
    }

    public addTransport(transport: any): any {
        return this._logger.add(transport)
    }

    public debug(message: string | object): void {
        this._logger.debug(message)
    }

    public error(message: string | object): void {
        this._logger.error(message)
    }

    public info(message: string | object): void {
        this._logger.info(message)
    }

    public warn(message: string | object): void {
        this._logger.warn(message)
    }
}
