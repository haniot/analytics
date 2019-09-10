import { QuestionnaireRecord } from './questionnaire.record'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { ToothLesion } from './tooth.lesion'
import { QuestionnaireTypes } from '../utils/questionnaire.types'
import { JsonUtils } from '../utils/json.utils'
import { ToothBrushingFrequencyTypes } from '../utils/tooth.brushing.frequency.types'

export class OralHealthRecord extends QuestionnaireRecord implements IJSONSerializable, IJSONDeserializable<OralHealthRecord> {
    private _teeth_brushing_freq?: ToothBrushingFrequencyTypes
    private _teeth_lesions ?: Array<ToothLesion>

    constructor() {
        super()
        super.type = QuestionnaireTypes.ORAL_HEALTH_RECORD
    }

    get teeth_brushing_freq(): ToothBrushingFrequencyTypes | undefined {
        return this._teeth_brushing_freq
    }

    set teeth_brushing_freq(value: ToothBrushingFrequencyTypes | undefined) {
        this._teeth_brushing_freq = value
    }

    get teeth_lesions(): Array<ToothLesion> | undefined {
        return this._teeth_lesions
    }

    set teeth_lesions(value: Array<ToothLesion> | undefined) {
        this._teeth_lesions = value
    }

    public fromJSON(json: any): OralHealthRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        super.fromJSON(json)
        if (json.teeth_brushing_freq !== undefined) this.teeth_brushing_freq = json.teeth_brushing_freq
        if (json.teeth_lesions !== undefined && json.teeth_lesions instanceof Array) {
            this.teeth_lesions = json.teeth_lesions.map(value => new ToothLesion().fromJSON(value))
        }
        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            teeth_brushing_freq: this.teeth_brushing_freq,
            teeth_lesions: this.teeth_lesions ? this.teeth_lesions.map(value => value.toJSON()) : []
        }
    }
}
