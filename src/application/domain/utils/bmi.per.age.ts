import csv from 'csvtojson'

export class BmiPerAge {
    private bmi_per_age_boys_path: string
    private bmi_per_age_girls_path: string
    private _bmi_per_age_boys: Array<any> | undefined
    private _bmi_per_age_girls: Array<any> | undefined

    constructor() {
        this.bmi_per_age_boys_path = __dirname.concat(`${process.env.BMI_PER_AGE_BOYS}`)
        this.bmi_per_age_girls_path = __dirname.concat(`${process.env.BMI_PER_AGE_GIRLS}`)
    }

    get bmi_per_age_boys(): Array<any> | undefined {
        return this._bmi_per_age_boys
    }

    set bmi_per_age_boys(value: Array<any> | undefined) {
        this._bmi_per_age_boys = value
    }

    get bmi_per_age_girls(): Array<any> | undefined {
        return this._bmi_per_age_girls
    }

    set bmi_per_age_girls(value: Array<any> | undefined) {
        this._bmi_per_age_girls = value
    }

    public async toJSON(): Promise<any> {
        this.bmi_per_age_boys = await this.csvToJson(this.bmi_per_age_boys_path)
        this.bmi_per_age_girls = await this.csvToJson(this.bmi_per_age_girls_path)

        return {
            bmi_per_age_boys: this.bmi_per_age_boys ? this.bmi_per_age_boys : [],
            bmi_per_age_girls: this.bmi_per_age_girls ? this.bmi_per_age_girls : []
        }
    }

    private async csvToJson(csvPath: string): Promise<any> {
        try {
            const bmiPerAgeJson = await csv().fromFile(csvPath)
            for (const item of bmiPerAgeJson) {
                item.p01 = parseFloat(item.p01)
                item.p3 = parseFloat(item.p3)
                item.p85 = parseFloat(item.p85)
                item.p97 = parseFloat(item.p97)
                item.p999 = parseFloat(item.p999)
            }
            return Promise.resolve(bmiPerAgeJson)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
