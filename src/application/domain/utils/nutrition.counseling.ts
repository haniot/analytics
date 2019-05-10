import csv from 'csvtojson'

export class NutritionCounseling {
    private _nutritional_counseling_path: string
    private _overweight_obesity_counseling?: string
    private _insulin_resistance_diabetes_counseling?: string
    private _hypertension_counseling?: string

    constructor() {
        this._nutritional_counseling_path = __dirname.concat(`${process.env.NUTRITIONAL_COUNSELING}`)
    }

    get overweight_obesity_counseling(): string | undefined {
        return this._overweight_obesity_counseling
    }

    set overweight_obesity_counseling(value: string | undefined) {
        this._overweight_obesity_counseling = value
    }

    get insulin_resistance_diabetes_counseling(): string | undefined {
        return this._insulin_resistance_diabetes_counseling
    }

    set insulin_resistance_diabetes_counseling(value: string | undefined) {
        this._insulin_resistance_diabetes_counseling = value
    }

    get hypertension_counseling(): string | undefined {
        return this._hypertension_counseling
    }

    set hypertension_counseling(value: string | undefined) {
        this._hypertension_counseling = value
    }

    public async toJSON(): Promise<any> {
        const nutritional_evaluation =
            await this.csvToJson(this._nutritional_counseling_path ? this._nutritional_counseling_path : '')
        return Promise.resolve(nutritional_evaluation[0])
    }

    private async csvToJson(csvPath: string): Promise<any> {
        try {
            const nutritionalCounseling = await csv().fromFile(csvPath)
            return Promise.resolve(nutritionalCounseling.map(item => this.jsonToModel(item)))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private jsonToModel(item: any): any {
        return {
            overweight_obesity_counseling: item.overweight_obesity_counseling,
            insulin_resistance_diabetes_counseling: item.insulin_resistance_diabetes_counseling,
            hypertension_counseling: item.hypertension_counseling
        }
    }
}
