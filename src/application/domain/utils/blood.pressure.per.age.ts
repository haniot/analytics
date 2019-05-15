import csv from 'csvtojson'
import { GenderTypes } from './gender.types'

export class BloodPressurePerAge {
    private _blood_pressure_per_age_height_boys_path: string
    private _blood_pressure_per_age_height_girls_path: string
    private _blood_pressure_per_sys_dias_boys_path: string
    private _blood_pressure_per_sys_dias_girls_path: string
    private _blood_pressure_per_age_height_boys: Array<any> | undefined
    private _blood_pressure_per_age_height_girls: Array<any> | undefined
    private _blood_pressure_per_sys_dias_boys: Array<any> | undefined
    private _blood_pressure_per_sys_dias_girls: Array<any> | undefined

    constructor() {
        this._blood_pressure_per_age_height_boys_path = __dirname.concat(`${process.env.BLOOD_PRESSURE_PER_AGE_HEIGHT_BOYS}`)
        this._blood_pressure_per_age_height_girls_path = __dirname.concat(`${process.env.BLOOD_PRESSURE_PER_AGE_HEIGHT_GIRLS}`)
        this._blood_pressure_per_sys_dias_boys_path = __dirname.concat(`${process.env.BLOOD_PRESSURE_PER_SYS_DIAS_BOYS}`)
        this._blood_pressure_per_sys_dias_girls_path = __dirname.concat(`${process.env.BLOOD_PRESSURE_PER_SYS_DIAS_GIRLS}`)
    }

    get blood_pressure_per_age_height_boys(): Array<any> | undefined {
        return this._blood_pressure_per_age_height_boys
    }

    set blood_pressure_per_age_height_boys(value: Array<any> | undefined) {
        this._blood_pressure_per_age_height_boys = value
    }

    get blood_pressure_per_age_height_girls(): Array<any> | undefined {
        return this._blood_pressure_per_age_height_girls
    }

    set blood_pressure_per_age_height_girls(value: Array<any> | undefined) {
        this._blood_pressure_per_age_height_girls = value
    }

    get blood_pressure_per_sys_dias_boys(): Array<any> | undefined {
        return this._blood_pressure_per_sys_dias_boys
    }

    set blood_pressure_per_sys_dias_boys(value: Array<any> | undefined) {
        this._blood_pressure_per_sys_dias_boys = value
    }

    get blood_pressure_per_sys_dias_girls(): Array<any> | undefined {
        return this._blood_pressure_per_sys_dias_girls
    }

    set blood_pressure_per_sys_dias_girls(value: Array<any> | undefined) {
        this._blood_pressure_per_sys_dias_girls = value
    }

    public async toJSON(gender: string): Promise<any> {
        this.blood_pressure_per_age_height_boys = await this.csvToJson(this._blood_pressure_per_age_height_boys_path)
        this.blood_pressure_per_age_height_girls = await this.csvToJson(this._blood_pressure_per_age_height_girls_path)
        this.blood_pressure_per_sys_dias_boys = await this.csvToJson(this._blood_pressure_per_sys_dias_boys_path)
        this.blood_pressure_per_sys_dias_girls = await this.csvToJson(this._blood_pressure_per_sys_dias_girls_path)

        if (gender === GenderTypes.MALE) return {
            blood_pressure_per_age_height:
                this.blood_pressure_per_age_height_boys && this.blood_pressure_per_age_height_boys.length ?
                    this.blood_pressure_per_age_height_boys : [],
            blood_pressure_per_sys_dias:
                this.blood_pressure_per_sys_dias_boys && this.blood_pressure_per_sys_dias_boys.length ?
                    this.blood_pressure_per_sys_dias_boys : []
        }
        return {
            blood_pressure_per_age_height:
                this.blood_pressure_per_age_height_girls && this.blood_pressure_per_age_height_girls.length ?
                    this.blood_pressure_per_age_height_girls : [],

            blood_pressure_per_sys_dias:
                this.blood_pressure_per_sys_dias_girls && this.blood_pressure_per_sys_dias_girls.length ?
                    this.blood_pressure_per_sys_dias_girls : []
        }
    }

    private async csvToJson(csvPath: string): Promise<any> {
        try {
            const result = await csv().fromFile(csvPath)
            return Promise.resolve(result.map(item => this.jsonToModel(item)))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private jsonToModel(item: any): Promise<any> {
        Object.keys(item).forEach(key => {
            item[key] = parseInt(item[key], 10)
        })
        return item
    }
}
