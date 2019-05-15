import csv from 'csvtojson'
import { Counseling } from '../model/counseling'
import { CounselingTypes } from './counseling.types'

export class NutritionCounseling {
    private _nutritional_counseling_path: string
    private _counseling?: Array<Counseling>

    constructor() {
        this._nutritional_counseling_path = __dirname.concat(`${process.env.NUTRITIONAL_COUNSELING}`)
    }

    get counseling(): Array<Counseling> | undefined {
        return this._counseling
    }

    set counseling(value: Array<Counseling> | undefined) {
        this._counseling = value
    }

    private async addCounseling(counseling: Counseling | Array<Counseling>) {
        if (!this.counseling) this.counseling = []
        if (counseling instanceof Array) counseling.forEach(council => this.addCounseling(council))
        else this.counseling.push(counseling)
    }

    public async toJSON(): Promise<any> {
        const nutritional_evaluation =
            await this.csvToJson(this._nutritional_counseling_path ? this._nutritional_counseling_path : '')
        return Promise.resolve(nutritional_evaluation)
    }

    private async csvToJson(csvPath: string): Promise<any> {
        try {
            const nutritionalCounseling = await csv().fromFile(csvPath)
            return Promise.resolve(this.jsonToModel(nutritionalCounseling))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private jsonToModel(nutritionalCounseling: any): any {

        const overweight_council: Counseling = new Counseling().fromJSON({
            type: CounselingTypes.OVERWEIGHT_OBESITY_COUNSELING,
            councils: nutritionalCounseling[0].overweight_obesity_counseling.split('_')
        })
        const insulin_council: Counseling = new Counseling().fromJSON({
            type: CounselingTypes.INSULIN_RESISTANCE_DIABETES_COUNSELING,
            councils: nutritionalCounseling[0].insulin_resistance_diabetes_counseling.split('_')
        })

        const hypertension_council: Counseling = new Counseling().fromJSON({
            type: CounselingTypes.HYPERTENSION_COUNSELING,
            councils: nutritionalCounseling[0].hypertension_counseling.split('_')
        })

        this.addCounseling([overweight_council, insulin_council, hypertension_council])

        return {
            overweight_obesity_counseling: overweight_council,
            insulin_resistance_diabetes_counseling: insulin_council,
            hypertension_counseling: hypertension_council
        }
    }
}
