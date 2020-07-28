import { EventType, IntegrationEvent } from './integration.event'
import { PilotStudy } from '../../domain/model/pilot.study'

export class PilotStudyDeleteEvent extends IntegrationEvent<PilotStudy> {
    public static readonly NAME: string = 'PilotStudyDeleteEvent'
    public static readonly ROUTING_KEY: string = 'pilotstudies.delete'

    constructor(public timestamp?: Date, public pilot_study?: PilotStudy) {
        super(PilotStudyDeleteEvent.NAME, EventType.PILOT_STUDY, timestamp)
    }

    public toJSON(): any {
        if (!this.pilot_study) return {}
        return {
            ...super.toJSON(),
            ...{ pilot_study: { id: this.pilot_study.id, name: this.pilot_study.name } }
        }
    }
}
