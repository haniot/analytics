import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class NutritionalCouncil implements IJSONSerializable, IJSONDeserializable<NutritionalCouncil> {
    private _bmi_whr?: Array<string>
    private _glycemia?: Array<string>
    private _blood_pressure?: Array<string>

    get bmi_whr(): Array<string> | undefined {
        return this._bmi_whr
    }

    set bmi_whr(value: Array<string> | undefined) {
        this._bmi_whr = value
    }

    get glycemia(): Array<string> | undefined {
        return this._glycemia
    }

    set glycemia(value: Array<string> | undefined) {
        this._glycemia = value
    }

    get blood_pressure(): Array<string> | undefined {
        return this._blood_pressure
    }

    set blood_pressure(value: Array<string> | undefined) {
        this._blood_pressure = value
    }

    public fromJSON(json: any): NutritionalCouncil {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.bmi_whr !== undefined) this.bmi_whr = json.bmi_whr
        if (json.glycemia !== undefined) this.glycemia = json.glycemia
        if (json.blood_pressure !== undefined) this.blood_pressure = json.blood_pressure
        return this
    }

    public toJSON(): any {
        return {
            bmi_whr: this.bmi_whr && this.bmi_whr.length ? this.bmi_whr : [],
            glycemia: this.glycemia && this.glycemia.length ? this.glycemia : [],
            blood_pressure: this.blood_pressure && this.blood_pressure.length ? this.blood_pressure : []
        }
    }
}
