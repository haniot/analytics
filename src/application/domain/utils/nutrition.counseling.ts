import csv from 'csvtojson'

export class NutritionCounseling {
    private _nutritional_counseling_path: string
    private _thinness_counseling?: Array<string>
    private _eutrophy_counseling?: Array<string>
    private _overweight_obesity_counseling?: Array<string>
    private _insulin_resistance_diabetes_counseling?: Array<string>
    private _hypertension_counseling?: Array<string>

    get thinness_counseling(): Array<string> | undefined {
        return this._thinness_counseling
    }

    set thinness_counseling(value: Array<string> | undefined) {
        this._thinness_counseling = value
    }

    get eutrophy_counseling(): Array<string> | undefined {
        return this._eutrophy_counseling
    }

    set eutrophy_counseling(value: Array<string> | undefined) {
        this._eutrophy_counseling = value
    }

    get overweight_obesity_counseling(): Array<string> | undefined {
        return this._overweight_obesity_counseling
    }

    set overweight_obesity_counseling(value: Array<string> | undefined) {
        this._overweight_obesity_counseling = value
    }

    get insulin_resistance_diabetes_counseling(): Array<string> | undefined {
        return this._insulin_resistance_diabetes_counseling
    }

    set insulin_resistance_diabetes_counseling(value: Array<string> | undefined) {
        this._insulin_resistance_diabetes_counseling = value
    }

    get hypertension_counseling(): Array<string> | undefined {
        return this._hypertension_counseling
    }

    set hypertension_counseling(value: Array<string> | undefined) {
        this._hypertension_counseling = value
    }

    constructor() {
        this._nutritional_counseling_path = __dirname.concat(`${process.env.NUTRITIONAL_COUNSELING}`)
    }

    public async toJSON(): Promise<any> {
        const nutritional_counseling =
            await this.csvToJson(this._nutritional_counseling_path ? this._nutritional_counseling_path : '')
        return Promise.resolve(nutritional_counseling)
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
