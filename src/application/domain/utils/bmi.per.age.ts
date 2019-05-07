import csv from 'csvtojson'

const bmiPerAgeBoysCsvPath = './files/bmi-per-age-boys.csv'
const bmiPerAgeGirlsCsvPath = './files/bmi-per-age-girls.csv'

export class BmiPerAge {
    private static instance: BmiPerAge
    private _bmi_boys_list: Array<any> | undefined
    private _bmi_girls_list: Array<any> | undefined

    private constructor() {
        this.convertCsvToJson()
    }

    public static getInstance() {
        if (!this.instance) this.instance = new BmiPerAge()
        return this.instance
    }

    get bmi_boys_list(): Array<any> | undefined {
        return this._bmi_boys_list
    }

    set bmi_boys_list(value: Array<any> | undefined) {
        this._bmi_boys_list = value
    }

    get bmi_girls_list(): Array<any> | undefined {
        return this._bmi_girls_list
    }

    set bmi_girls_list(value: Array<any> | undefined) {
        this._bmi_girls_list = value
    }

    private async convertCsvToJson(): Promise<void> {
        this.bmi_boys_list = await this.csvToJson(bmiPerAgeBoysCsvPath)
        this.bmi_girls_list = await this.csvToJson(bmiPerAgeGirlsCsvPath)
    }

    private async csvToJson(csvPath: string): Promise<any> {
        try {
            const bmiPerAgeJson = await csv().fromFile(csvPath)
            for (let i = 0; i < bmiPerAgeJson.length; i++) {
                bmiPerAgeJson[i].p01 = parseFloat(bmiPerAgeJson[i].p01)
                bmiPerAgeJson[i].p3 = parseFloat(bmiPerAgeJson[i].p3)
                bmiPerAgeJson[i].p85 = parseFloat(bmiPerAgeJson[i].p85)
                bmiPerAgeJson[i].p97 = parseFloat(bmiPerAgeJson[i].p97)
                bmiPerAgeJson[i].p999 = parseFloat(bmiPerAgeJson[i].p999)
                bmiPerAgeJson[i] = this.buildBmiPerAgeObject(bmiPerAgeJson[i])
            }
            return Promise.resolve(bmiPerAgeJson)
        } catch (err) {
            console.log('err', err)
            return Promise.reject(err)
        }
    }

    private buildBmiPerAgeObject(object: any): any {
        const result = {
            age: object.age,
            percentile: undefined
        }
        delete object.age
        result.percentile = object
        return result
    }
}
