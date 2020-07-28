import { EventType, IntegrationEvent } from './integration.event'
import { Email } from '../../domain/model/email'

export class EmailPilotStudyDataEvent extends IntegrationEvent<Email> {
    public static readonly NAME: string = 'EmailPilotStudyDataEvent'
    public static readonly ROUTING_KEY: string = 'emails.pilotstudies.data'

    constructor(public timestamp?: Date, public email?: Email) {
        super(EmailPilotStudyDataEvent.NAME, EventType.EMAIL, timestamp)
    }

    public toJSON(): any {
        if (!this.email) return {}
        return {
            ...super.toJSON(),
            ...{
                email: this.email.toJSON()
            }
        }
    }
}
