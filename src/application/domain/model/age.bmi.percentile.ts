import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class AgeBmiPercentile implements IJSONSerializable, IJSONDeserializable<AgeBmiPercentile> {
    private _age?: string
    private _p01?: number
    private _p3?: number
    private _p85?: number
    private _p97?: number
    private _p999?: number

    get age(): string | undefined {
        return this._age
    }

    set age(value: string | undefined) {
        this._age = value
    }

    get p01(): number | undefined {
        return this._p01
    }

    set p01(value: number | undefined) {
        this._p01 = value
    }

    get p3(): number | undefined {
        return this._p3
    }

    set p3(value: number | undefined) {
        this._p3 = value
    }

    get p85(): number | undefined {
        return this._p85
    }

    set p85(value: number | undefined) {
        this._p85 = value
    }

    get p97(): number | undefined {
        return this._p97
    }

    set p97(value: number | undefined) {
        this._p97 = value
    }

    get p999(): number | undefined {
        return this._p999
    }

    set p999(value: number | undefined) {
        this._p999 = value
    }

    public fromJSON(json: any): AgeBmiPercentile {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.age !== undefined) this.age = json.age
        if (json.p01 !== undefined) this.p01 = json.p01
        if (json.p3 !== undefined) this.p3 = json.p3
        if (json.p85 !== undefined) this.p85 = json.p85
        if (json.p97 !== undefined) this.p97 = json.p97
        if (json.p999 !== undefined) this.p999 = json.p999
        return this
    }

    public toJSON(): any {
        return {
            age: this.age,
            percentile: {
                p01: this.p01,
                p3: this.p3,
                p85: this.p85,
                p97: this.p97,
                p999: this.p999
            }
        }
    }
}
