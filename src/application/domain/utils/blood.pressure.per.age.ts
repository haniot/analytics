import csv from 'csvtojson'

export class BloodPressurePerAge {
    private _blood_pressure_per_age_boys_path: string
    private _blood_pressure_per_age_girls_path: string
    private _blood_pressure_per_age_boys: Array<any> | undefined
    private _blood_pressure_per_age_girls: Array<any> | undefined

    constructor() {
        this._blood_pressure_per_age_boys_path = __dirname.concat(`${process.env.BLOOD_PRESSURE_PER_AGE_BOYS}`)
        this._blood_pressure_per_age_girls_path = __dirname.concat(`${process.env.BLOOD_PRESSURE_PER_AGE_GIRLS}`)
    }

    get blood_pressure_per_age_boys(): Array<any> | undefined {
        return this._blood_pressure_per_age_boys
    }

    set blood_pressure_per_age_boys(value: Array<any> | undefined) {
        this._blood_pressure_per_age_boys = value
    }

    get blood_pressure_per_age_girls(): Array<any> | undefined {
        return this._blood_pressure_per_age_girls
    }

    set blood_pressure_per_age_girls(value: Array<any> | undefined) {
        this._blood_pressure_per_age_girls = value
    }

    public async toJSON(): Promise<any> {
        this.blood_pressure_per_age_boys = await this.csvToJson(this._blood_pressure_per_age_boys_path)
        this.blood_pressure_per_age_girls = await this.csvToJson(this._blood_pressure_per_age_girls_path)

        return {
            blood_pressure_per_age_boys: this.blood_pressure_per_age_boys ? this.blood_pressure_per_age_boys : [],
            blood_pressure_per_age_girls: this.blood_pressure_per_age_girls ? this.blood_pressure_per_age_girls : []
        }
    }

    private async csvToJson(csvPath: string): Promise<any> {
        try {
            const bloodGlucosePerAgeJson = await csv().fromFile(csvPath)
            return Promise.resolve(bloodGlucosePerAgeJson.map(item => this.jsonToModel(item)))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private jsonToModel(item: any): any {
        return {
            age: item.age,
            percentile: {
                value: item.percentile_value,
                systolic: {
                    pas5: parseInt(item.percentile_systolic_pas5, 10),
                    pas10: parseInt(item.percentile_systolic_pas10, 10),
                    pas25: parseInt(item.percentile_systolic_pas25, 10),
                    pas50: parseInt(item.percentile_systolic_pas50, 10),
                    pas75: parseInt(item.percentile_systolic_pas75, 10),
                    pas90: parseInt(item.percentile_systolic_pas90, 10),
                    pas95: parseInt(item.percentile_systolic_pas95, 10)
                },
                diastolic: {
                    pad5: parseInt(item.percentile_diastolic_pad5, 10),
                    pad10: parseInt(item.percentile_diastolic_pad10, 10),
                    pad25: parseInt(item.percentile_diastolic_pad25, 10),
                    pad50: parseInt(item.percentile_diastolic_pad50, 10),
                    pad75: parseInt(item.percentile_diastolic_pad75, 10),
                    pad90: parseInt(item.percentile_diastolic_pad90, 10),
                    pad95: parseInt(item.percentile_diastolic_pad95, 10)
                }
            }
        }
    }
}
