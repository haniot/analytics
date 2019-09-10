import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { DentalLesionTypes } from '../utils/dental.lesion.types'
import { ToothTypes } from '../utils/tooth.types'

export class ToothLesion implements IJSONSerializable, IJSONDeserializable<ToothLesion> {
    private _tooth_type?: ToothTypes
    private _lesion_type?: DentalLesionTypes

    get tooth_type(): ToothTypes | undefined {
        return this._tooth_type
    }

    set tooth_type(value: ToothTypes | undefined) {
        this._tooth_type = value
    }

    get lesion_type(): DentalLesionTypes | undefined {
        return this._lesion_type
    }

    set lesion_type(value: DentalLesionTypes | undefined) {
        this._lesion_type = value
    }

    public fromJSON(json: any): ToothLesion {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.tooth_type !== undefined) this.tooth_type = json.tooth_type
        if (json.lesion_type !== undefined) this.lesion_type = json.lesion_type

        return this
    }

    public toJSON(): any {
        return {
            tooth_type: this.tooth_type,
            lesion_type: this.lesion_type
        }
    }
}
