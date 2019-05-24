import { inject, injectable } from 'inversify'
import { IOdontologicEvaluationService } from '../port/odontologic.evaluation.service.interface'
import { IQuery } from '../port/query.interface'
import { OdontologicEvaluation } from '../domain/model/odontologic.evaluation'
import { OdontologicEvaluationRequest } from '../domain/model/odontologic.evaluation.request'
import { MeasurementTypes } from '../domain/utils/measurement.types'
import { FeedingHabitsRecord } from '../domain/model/feeding.habits.record'
import { SleepHabit } from '../domain/model/sleep.habit'
import { SociodemographicRecord } from '../domain/model/sociodemographic.record'
import { FamilyCohesionRecord } from '../domain/model/family.cohesion.record'
import { OralHealthRecord } from '../domain/model/oral.health.record'
import { DateUtils } from '../domain/utils/date.utils'
import { GenderTypes } from '../domain/utils/gender.types'
import { ColorRaceTypes } from '../domain/utils/color.race.types'
import { ScholarityLevelTypes } from '../domain/utils/scholarity.level.types'
import { FamilyCohesionFrequencyTypes } from '../domain/utils/family.cohesion.frequency.types'
import { ToothBrushingFrequencyTypes } from '../domain/utils/tooth.brushing.frequency.types'
import { DentalLesionTypes } from '../domain/utils/dental.lesion.types'
import { ToothTypes } from '../domain/utils/tooth.types'
import { OneDayFeedingAmountTypes } from '../domain/utils/one.day.feeding.amount.types'
import { BreastFeedingTypes } from '../domain/utils/breast.feeding.types'
import { FoodAllergyIntoleranceTypes } from '../domain/utils/food.allergy.intolerance.types'
import { DailyFeedingFrequencyTypes } from '../domain/utils/daily.feeding.frequency.types'
import { Identifier } from '../../di/identifiers'
import { IOdontologicEvaluationRepository } from '../port/odontologic.evaluation.repository.interface'
import { WeeklyFoodRecord } from '../domain/model/weekly.food.record'
import { FoodTypes } from '../domain/utils/food.types'
import { SevenDaysFeedingFrequencyTypes } from '../domain/utils/seven.days.feeding.frequency.types'
import { MealTypes } from '../domain/utils/meal.types'
import { Parser } from 'json2csv'
import json2xls from 'json2xls'

@injectable()
export class OdontologicEvaluationService implements IOdontologicEvaluationService {
    constructor(
        @inject(Identifier.ODONTOLOGIC_EVALUATION_REPOSITORY) readonly _repo: IOdontologicEvaluationRepository
        // @inject(Identifier.ODONTOLOGIC_EVALUATION_REPOSITORY) private readonly _repo: IOdontologicEvaluationRepository
    ) {
    }

    public add(item: OdontologicEvaluation): Promise<OdontologicEvaluation> {
        throw Error('Not implemented!')
    }

    public getAll(query: IQuery): Promise<Array<OdontologicEvaluation>> {
        throw Error('Not implemented!')
    }

    public getById(id: string, query: IQuery): Promise<OdontologicEvaluation> {
        throw Error('Not implemented!')
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented!')
    }

    public update(item: OdontologicEvaluation): Promise<OdontologicEvaluation> {
        throw Error('Not implemented!')
    }

    public async addEvaluation(item: Array<OdontologicEvaluationRequest>): Promise<OdontologicEvaluation> {
        await this.generateEvaluation(item)
        return Promise.resolve(undefined!)
    }

    private async generateEvaluation(requests: Array<OdontologicEvaluationRequest>): Promise<OdontologicEvaluation> {
        const result: OdontologicEvaluation = new OdontologicEvaluation()
        const evaluationData = requests.map(item => this.getEvaluationData(item))
        const csv = await this.generateCsvEvaluation(evaluationData)
        const xls = await this.generateXlsEvaluation(evaluationData)
        console.log(csv)
        xls
        return Promise.resolve(result)
    }

    private getEvaluationData(request: OdontologicEvaluationRequest): any {
        const patient: any = request.patient!.toJSON()
        const height = request.measurements!
            .filter(item => item.type === MeasurementTypes.HEIGHT)[0].toJSON()
        const weight = request.measurements!
            .filter(item => item.type === MeasurementTypes.WEIGHT)[0].toJSON()
        const blood_glucose = request.measurements!
            .filter(item => item.type === MeasurementTypes.BLOOD_GLUCOSE)[0].toJSON()
        const waist_circumference = request.measurements!
            .filter(item => item.type === MeasurementTypes.WAIST_CIRCUMFERENCE)[0].toJSON()

        const feeding_habits_record: FeedingHabitsRecord = request.feeding_habits_record!

        const food_allergy: any = this.getFoodAllergy(feeding_habits_record.food_allergy_intolerance!)
        const food_consumption: any = this.getFoodConsumption(feeding_habits_record.weekly_feeding_habits!)

        const sleep_habit: SleepHabit = request.sleep_habit!
        const sociodemographic_record: SociodemographicRecord = request.sociodemographic_record!
        const family_cohesion_record: FamilyCohesionRecord = request.family_cohesion_record!

        const oral_health_record: OralHealthRecord = request.oral_health_record!
        const teeth_lesions: any = this.getTeethLesions(oral_health_record)

        return {
            // Patient
            gender: Object.values(GenderTypes).indexOf(patient.gender) + 1,
            age: DateUtils.getAgeFromBirthDate(patient.birth_date).age,

            // Measurements
            height: height.value,
            waist_circumference: waist_circumference.value,
            weight: weight.value,
            blood_glucose_value: blood_glucose.value,
            blood_glucose_meal: Object.values(MealTypes).indexOf(blood_glucose.meal) + 1,

            // Sociodemographic Record
            color_race: Object.values(ColorRaceTypes).indexOf(sociodemographic_record.color_race) + 1,
            mother_scholarity: Object.values(ScholarityLevelTypes).indexOf(sociodemographic_record.mother_scholarity) + 1,
            people_in_home: sociodemographic_record.people_in_home! >= 6 ? 6 : sociodemographic_record.people_in_home,

            // Family Cohesion Record
            family_mutual_aid_freq:
                Object.values(FamilyCohesionFrequencyTypes).indexOf(family_cohesion_record.family_mutual_aid_freq) + 1,
            friendship_approval_freq:
                Object.values(FamilyCohesionFrequencyTypes).indexOf(family_cohesion_record.friendship_approval_freq) + 1,
            family_only_task:
                Object.values(FamilyCohesionFrequencyTypes).indexOf(family_cohesion_record.family_only_task_freq) + 1,
            family_only_preference_freq:
                Object.values(FamilyCohesionFrequencyTypes).indexOf(family_cohesion_record.family_only_preference_freq) + 1,
            free_time_together_freq:
                Object.values(FamilyCohesionFrequencyTypes).indexOf(family_cohesion_record.free_time_together_freq) + 1,
            all_family_tasks_freq:
                Object.values(FamilyCohesionFrequencyTypes).indexOf(family_cohesion_record.all_family_tasks_freq) + 1,
            family_tasks_opportunity_freq:
                Object.values(FamilyCohesionFrequencyTypes).indexOf(family_cohesion_record.family_tasks_opportunity_freq) + 1,
            family_decision_support_freq:
                Object.values(FamilyCohesionFrequencyTypes).indexOf(family_cohesion_record.family_decision_support_freq) + 1,
            family_union_relevance_freq:
                Object.values(FamilyCohesionFrequencyTypes).indexOf(family_cohesion_record.family_union_relevance_freq) + 1,
            family_cohesion_result: family_cohesion_record.family_cohesion_result,

            // Oral Health
            teeth_brushing_freq: Object.values(ToothBrushingFrequencyTypes).indexOf(oral_health_record.teeth_brushing_freq) + 1,
            teeth_cavitated_lesion_deciduous_tooth: teeth_lesions.teeth_cavitated_lesion_deciduous_tooth,
            teeth_cavitated_lesion_permanent_tooth: teeth_lesions.teeth_cavitated_lesion_permanent_tooth,
            teeth_white_spot_lesion_deciduous_tooth: teeth_lesions.teeth_white_spot_lesion_deciduous_tooth,
            teeth_white_spot_lesion_permanent_tooth: teeth_lesions.teeth_white_spot_lesion_permanent_tooth,
            fish_chicken_meat_consumption_frequency: food_consumption.fish_chicken_meat_consumption_frequency,
            soda_consumption_frequency: food_consumption.soda_consumption_frequency,
            salad_vegetable_consumption_frequency: food_consumption.salad_vegetable_consumption_frequency,
            fried_salt_food_consumption_frequency: food_consumption.fried_salt_food_consumption_frequency,
            milk_consumption_frequency: food_consumption.milk_consumption_frequency,
            bean_consumption_frequency: food_consumption.bean_consumption_frequency,
            fruits_consumption_frequency: food_consumption.fruits_consumption_frequency,
            candy_sugar_cookie_consumption_frequency: food_consumption.candy_sugar_cookie_consumption_frequency,
            burger_sausage_consumption_frequency: food_consumption.burger_sausage_consumption_frequency,
            daily_water_glasses: Object.values(OneDayFeedingAmountTypes).indexOf(feeding_habits_record.daily_water_glasses) + 1,
            six_month_breast_feeding:
                Object.values(BreastFeedingTypes).indexOf(feeding_habits_record.six_month_breast_feeding) + 1,
            gluten_allergy_intolerance: food_allergy.gluten_allergy_intolerance,
            aplv_allergy_intolerance: food_allergy.aplv_allergy_intolerance,
            lactose_allergy_intolerance: food_allergy.lactose_allergy_intolerance,
            dye_allergy_intolerance: food_allergy.dye_allergy_intolerance,
            egg_allergy_intolerance: food_allergy.egg_allergy_intolerance,
            peanut_allergy_intolerance: food_allergy.peanut_allergy_intolerance,
            other_allergy_intolerance: food_allergy.other_allergy_intolerance,
            undefined_allergy_intolerance: food_allergy.undefined_allergy_intolerance,
            breakfast_daily_frequency:
                Object.values(DailyFeedingFrequencyTypes).indexOf(feeding_habits_record.breakfast_daily_frequency) + 1,

            // Sleep Habit
            daily_sleep_time: 24 - sleep_habit.week_day_sleep! + sleep_habit.week_day_wake_up!
        }
    }

    private getTeethLesions(oralHealthRecord: OralHealthRecord): any {
        const result: any = {
            teeth_cavitated_lesion_deciduous_tooth: 2,
            teeth_cavitated_lesion_permanent_tooth: 2,
            teeth_white_spot_lesion_deciduous_tooth: 2,
            teeth_white_spot_lesion_permanent_tooth: 2
        }
        oralHealthRecord.teeth_lesions!.forEach(tooth => {
            if (tooth.lesion_type === DentalLesionTypes.CAVITATED_LESION) {
                if (tooth.tooth_type === ToothTypes.DECIDUOUS_TOOTH) {
                    result.teeth_cavitated_lesion_deciduous_tooth = 1
                } else {
                    result.teeth_cavitated_Lesion_permanent_tooth = 1
                }
            } else {
                if (tooth.tooth_type === ToothTypes.DECIDUOUS_TOOTH) {
                    result.teeth_white_spot_lesion_deciduous_tooth = 1
                } else {
                    result.teeth_white_spot_lesion_permanent_tooth = 1
                }
            }
        })
        return result
    }

    private getFoodConsumption(foodConsumption: Array<WeeklyFoodRecord>): any {
        const result: any = {
            fish_chicken_meat_consumption_frequency: 1,
            soda_consumption_frequency: 1,
            salad_vegetable_consumption_frequency: 1,
            fried_salt_food_consumption_frequency: 1,
            milk_consumption_frequency: 1,
            bean_consumption_frequency: 1,
            fruits_consumption_frequency: 1,
            candy_sugar_cookie_consumption_frequency: 1,
            burger_sausage_consumption_frequency: 1
        }

        foodConsumption.forEach(food => {
            switch (food.food) {
                case(FoodTypes.FISH_CHICKEN_MEAT):
                    result.fish_chicken_meat_consumption_frequency =
                        Object.values(SevenDaysFeedingFrequencyTypes).indexOf(food.seven_days_freq) + 1
                    break
                case(FoodTypes.SODA):
                    result.soda_consumption_frequency =
                        Object.values(SevenDaysFeedingFrequencyTypes).indexOf(food.seven_days_freq) + 1
                    break
                case(FoodTypes.SALAD_VEGETABLE):
                    result.salad_vegetable_consumption_frequency =
                        Object.values(SevenDaysFeedingFrequencyTypes).indexOf(food.seven_days_freq) + 1
                    break
                case(FoodTypes.FRIED_SALT_FOOD):
                    result.fried_salt_food_consumption_frequency =
                        Object.values(SevenDaysFeedingFrequencyTypes).indexOf(food.seven_days_freq) + 1
                    break
                case(FoodTypes.MILK):
                    result.milk_consumption_frequency =
                        Object.values(SevenDaysFeedingFrequencyTypes).indexOf(food.seven_days_freq) + 1
                    break
                case(FoodTypes.BEAN):
                    result.bean_consumption_frequency =
                        Object.values(SevenDaysFeedingFrequencyTypes).indexOf(food.seven_days_freq) + 1
                    break
                case(FoodTypes.FRUITS):
                    result.fruits_consumption_frequency =
                        Object.values(SevenDaysFeedingFrequencyTypes).indexOf(food.seven_days_freq) + 1
                    break
                case(FoodTypes.CANDY_SUGAR_COOKIE):
                    result.candy_sugar_cookie_consumption_frequency =
                        Object.values(SevenDaysFeedingFrequencyTypes).indexOf(food.seven_days_freq) + 1
                    break
                case(FoodTypes.BURGER_SAUSAGE):
                    result.burger_sausage_consumption_frequency =
                        Object.values(SevenDaysFeedingFrequencyTypes).indexOf(food.seven_days_freq) + 1
                    break
                default:
                    return undefined
            }
        })
        return result
    }

    private getFoodAllergy(foodAllergy: Array<string>): any {
        const result: any = {
            gluten_allergy_intolerance: 2,
            aplv_allergy_intolerance: 2,
            lactose_allergy_intolerance: 2,
            dye_allergy_intolerance: 2,
            egg_allergy_intolerance: 2,
            peanut_allergy_intolerance: 2,
            other_allergy_intolerance: 2,
            undefined_allergy_intolerance: 2
        }
        foodAllergy!.forEach(food => {
            switch (food) {
                case (FoodAllergyIntoleranceTypes.GLUTEN):
                    result.gluten_allergy_intolerance = 1
                    break
                case (FoodAllergyIntoleranceTypes.APLV):
                    result.aplv_allergy_intolerance = 1
                    break
                case (FoodAllergyIntoleranceTypes.LACTOSE):
                    result.lactose_allergy_intolerance = 1
                    break
                case (FoodAllergyIntoleranceTypes.DYE):
                    result.dye_allergy_intolerance = 1
                    break
                case (FoodAllergyIntoleranceTypes.EGG):
                    result.egg_allergy_intolerance = 1
                    break
                case (FoodAllergyIntoleranceTypes.PEANUT):
                    result.peanut_allergy_intolerance = 1
                    break
                case (FoodAllergyIntoleranceTypes.OTHER):
                    result.other_allergy_intolerance = 1
                    break
                case (FoodAllergyIntoleranceTypes.UNDEFINED):
                    result.undefined_allergy_intolerance = 1
                    break
                default:
                    break
            }
        })
        return result
    }

    private async generateCsvEvaluation(evaluation: any): Promise<any> {
        const fields = Object.keys(evaluation[0])
        const opts = { fields }
        try {
            const parser = new Parser(opts)
            const csv = parser.parse(evaluation)
            return Promise.resolve(csv)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private async generateXlsEvaluation(evaluation: any): Promise<any> {
        try {
            return Promise.resolve(json2xls(evaluation))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
