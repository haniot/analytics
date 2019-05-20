import { BmiPerAge } from '../../application/domain/model/bmi.per.age'
import csv from 'csvtojson'

export class BmiPerAgeRepository {
    private bmi_per_age_boys_path: string = __dirname.concat('/files/bmi-per-age-boys.csv')
    private bmi_per_age_girls_path: string = __dirname.concat('/files/bmi-per-age-girls.csv')

    public async getBmiPerAge(): Promise<BmiPerAge> {
        try {
            const result: BmiPerAge = new BmiPerAge()
            result.bmi_per_age_boys = await this.csvToJson(this.bmi_per_age_boys_path)
            result.bmi_per_age_girls = await this.csvToJson(this.bmi_per_age_girls_path)
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async csvToJson(csvPath: string): Promise<any> {
        try {
            const bmiPerAgeJson = await csv().fromFile(csvPath)
            return Promise.resolve(bmiPerAgeJson.map(item => this.jsonToModel(item)))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private jsonToModel(item: any): any {
        return {
            age: item.age,
            p01: parseFloat(item.p01),
            p3: parseFloat(item.p3),
            p85: parseFloat(item.p85),
            p97: parseFloat(item.p97),
            p999: parseFloat(item.p999)
        }
    }

}
