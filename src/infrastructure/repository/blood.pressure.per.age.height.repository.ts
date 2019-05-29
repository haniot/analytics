import csv from 'csvtojson'
import { BloodPressurePerAgeHeight } from '../../application/domain/model/blood.pressure.per.age.height'
import { IFileRepository } from '../../application/port/files.repository.interface'
import { injectable } from 'inversify'

@injectable()
export class BloodPressurePerAgeHeightRepository implements IFileRepository<BloodPressurePerAgeHeight> {
    private blood_pressure_per_age_height_boys_path: string = __dirname.concat('/files/blood-pressure-per-age-height-boys.csv')
    private blood_pressure_per_age_height_girls_path: string = __dirname.concat('/files/blood-pressure-per-age-height-girls.csv')

    public async getFile(): Promise<BloodPressurePerAgeHeight> {
        try {
            const result: BloodPressurePerAgeHeight = new BloodPressurePerAgeHeight()
            result.blood_pressure_per_age_boys = await this.csvToJson(this.blood_pressure_per_age_height_boys_path)
            result.blood_pressure_per_age_girls = await this.csvToJson(this.blood_pressure_per_age_height_girls_path)
            return Promise.resolve(result)
        } catch (err) {
            return Promise.reject(err)
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
