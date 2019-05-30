// import { NutritionStatus } from '../domain/model/nutrition.status'
// import { Identifier } from '../../di/identifiers'
// import { inject } from 'inversify'
// import { IFileRepository } from '../port/files.repository.interface'
// import { BmiPerAge } from '../domain/model/bmi.per.age'
// import { BmiPerAgeClassificationTypes } from '../domain/utils/bmi.per.age.classification.types'
// import { AgeBmiPercentile } from '../domain/model/age.bmi.percentile'
//
// export class EvaluationService {
//     constructor(
//         @inject(Identifier.BMI_PER_AGE_REPOSITORY) readonly _bmiPerAgeRepo: IFileRepository<BmiPerAge>
//     ) {
//     }
//
//     private calculateBmi(weight: number, height: number): number {
//         return parseFloat((weight / Math.pow((height / 100), 2)).toFixed(1))
//     }
//
//     private async getBmiPercentileFromAgeGender(age: string, gender: string): Promise<AgeBmiPercentile> {
//         try {
//             const bmiPerAge: BmiPerAge = await this._bmiPerAgeRepo.getFile()
//             if (gender === 'male') return Promise.resolve(bmiPerAge.bmi_per_age_boys!.filter(value => value.age === age)[0])
//             return Promise.resolve(bmiPerAge.bmi_per_age_girls!.filter(value => value.age === age)[0])
//         } catch (err) {
//             return Promise.reject(err)
//         }
//     }
//
//     private getBmiClassification(bmi: number, percentile: any): any {
//         if (!percentile) return {
//             percentile: 'undefined',
//             classification: 'undefined'
//         }
//
//         if (bmi < percentile.p01) return {
//             percentile: 'p01',
//             classification: BmiPerAgeClassificationTypes.ACCENTUATED_THINNESS
//         }
//         else if (percentile.p01 < bmi && bmi < percentile.p3) return {
//             percentile: 'p3',
//             classification: BmiPerAgeClassificationTypes.THINNESS
//         }
//         else if (percentile.p3 < bmi && bmi < percentile.p85) return {
//             percentile: 'p85',
//             classification: BmiPerAgeClassificationTypes.EUTROPHY
//         }
//         else if (percentile.p85 < bmi && bmi < percentile.p97) return {
//             percentile: 'p97',
//             classification: BmiPerAgeClassificationTypes.OVERWEIGHT
//         }
//         else if (percentile.p97 < bmi && bmi < percentile.p999) return {
//             percentile: 'p999',
//             classification: BmiPerAgeClassificationTypes.OBESITY
//         }
//         else return { percentile: 'p999', classification: BmiPerAgeClassificationTypes.SEVERE_OBESITY }
//     }
//
//     public async getNutritionalStatus(age: string, gender: string, height: number, weight: number): Promise<NutritionStatus> {
//         const result: NutritionStatus = new NutritionStatus()
//
//         try {
//             result.height = height
//             result.weight = weight
//             result.bmi = this.calculateBmi(weight, height)
//             const percentile: AgeBmiPercentile = await this.getBmiPercentileFromAgeGender(age, gender)
//             const bmiClassification = this.getBmiClassification(result.bmi, percentile)
//             result.percentile = bmiClassification.percentile
//             result.classification = bmiClassification.classification
//         } catch (err) {
//             return Promise.reject(err)
//         }
//
//     }
//
// }
