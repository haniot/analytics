import { NutritionCounseling } from '../../application/domain/model/nutrition.counseling'
import csv from 'csvtojson'
import { IFileRepository } from '../../application/port/files.repository.interface'
import { injectable } from 'inversify'

@injectable()
export class NutritionCounselingRepository implements IFileRepository<NutritionCounseling>{
    private counseling_path: string = __dirname.concat('/files/nutritional-counseling.csv')

    public async getFile(): Promise<NutritionCounseling> {
        try {
            const counseling = await this.csvToJson(this.counseling_path)
            return Promise.resolve(new NutritionCounseling().fromJSON(counseling))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async csvToJson(csvPath: string): Promise<any> {
        try {
            const counseling = await csv().fromFile(csvPath)
            return Promise.resolve(this.jsonToModel(counseling[0]))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private jsonToModel(counseling: any): any {
        return {
            thinness_counseling: counseling.thinness_counseling.split('_'),
            eutrophy_counseling: counseling.eutrophy_counseling.split('_'),
            overweight_obesity_counseling: counseling.overweight_obesity_counseling.split('_'),
            insulin_resistance_diabetes_counseling: counseling.insulin_resistance_diabetes_counseling.split('_'),
            hypertension_counseling: counseling.hypertension_counseling.split('_')
        }
    }

}
