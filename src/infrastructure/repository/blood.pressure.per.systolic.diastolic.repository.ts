import csv from 'csvtojson'
import { BloodPressurePerSystolicDiastolic } from '../../application/domain/model/blood.pressure.per.systolic.diastolic'

export class BloodPressurePerSystolicDiastolicRepository {
    private blood_pressure_per_age_sys_dias_boys_path: string = __dirname.concat('/files/blood-pressure-per-sys-dias-boys.csv')
    private blood_pressure_per_age_sys_dias_girls_path: string = __dirname.concat('/files/blood-pressure-per-sys-dias-girls.csv')

    public async getBloodPressurePerAgeHeight(): Promise<BloodPressurePerSystolicDiastolic> {
        try {
            const result: BloodPressurePerSystolicDiastolic = new BloodPressurePerSystolicDiastolic()
            result.age_systolic_diastolic_percentile_boys = await this.csvToJson(this.blood_pressure_per_age_sys_dias_boys_path)
            result.age_systolic_diastolic_percentile_girls = await this.csvToJson(this.blood_pressure_per_age_sys_dias_girls_path)
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
