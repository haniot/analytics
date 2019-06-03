import { BloodGlucoseMeasurement } from '../../../src/application/domain/model/blood.glucose.measurement'
import { HeightMeasurement } from '../../../src/application/domain/model/height.measurement'
import { WaistCircumferenceMeasurement } from '../../../src/application/domain/model/waist.circumference.measurement'
import { WeightMeasurement } from '../../../src/application/domain/model/weight.measurement'

export abstract class DefaultEntityMock {
    public static ODONTOLOGIC_EVALUATION = {
        id: '5cb4882751b5f21ba364ba6f',
        total_patients: 1,
        file_csv: 'https://repo.com/file.csv',
        file_xls: 'https://repo.com/file.xls',
        health_professional_id: '5c86d00cfc25e7036d51d652',
        pilotstudy_id: '5c86d00c2239a48ea20a0134',
        created_at: '2018-11-19T14:40:00'
    }

    public static ODONTOLOGIC_EVALUATION_REQUEST = {
        patient: {
            name: 'Elvis Aaron',
            email: 'elvis@mail.com',
            gender: 'male',
            birth_date: '2008-01-08',
            pilotstudy_id: '5c86d00c2239a48ea20a0134'
        },
        measurements: [
            new BloodGlucoseMeasurement().fromJSON({
                value: 146,
                unit: 'mg/dl',
                meal: 'preprandial',
                type: 'blood_glucose',
                timestamp: '2018-11-19T14:40:00Z',
                device_id: '5ca790f77aefffa37a17b605'
            }),
            new HeightMeasurement().fromJSON({
                value: 155,
                unit: 'cm',
                type: 'height',
                timestamp: '2018-11-19T14:40:00Z',
                device_id: '5ca790f77aefffa37a17b605'
            }),
            new WaistCircumferenceMeasurement().fromJSON({
                value: 70,
                unit: 'cm',
                type: 'waist_circumference',
                timestamp: '2018-11-19T14:40:00Z',
                device_id: '5ca790f77aefffa37a17b605'
            }),
            new WeightMeasurement().fromJSON({
                value: 50,
                unit: 'kg',
                type: 'weight',
                timestamp: '2018-11-19T14:40:00Z',
                device_id: '5ca790f77aefffa37a17b605'
            })
        ],
        feeding_habits_record: {
            weekly_feeding_habits: [
                {
                    food: 'fish_chicken_meat',
                    seven_days_freq: 'one_two_days'
                },
                {
                    food: 'soda',
                    seven_days_freq: 'one_two_days'
                },
                {
                    food: 'salad_vegetable',
                    seven_days_freq: 'three_four_days'
                },
                {
                    food: 'fried_salt_food',
                    seven_days_freq: 'one_two_days'
                },
                {
                    food: 'milk',
                    seven_days_freq: 'three_four_days'
                },
                {
                    food: 'bean',
                    seven_days_freq: 'all_days'
                },
                {
                    food: 'fruits',
                    seven_days_freq: 'all_days'
                },
                {
                    food: 'candy_sugar_cookie',
                    seven_days_freq: 'one_two_days'
                },
                {
                    food: 'burger_sausage',
                    seven_days_freq: 'one_two_days'
                }
            ],
            daily_water_glasses: 'five_more',
            six_month_breast_feeding: 'complementary',
            food_allergy_intolerance: ['gluten', 'aplv', 'lactose', 'dye', 'egg', 'peanut', 'other', 'undefined'],
            breakfast_daily_frequency: 'everyday'
        },
        sleep_habit: {
            week_day_sleep: 22,
            week_day_wake_up: 8
        },
        sociodemographic_record: {
            color_race: 'white',
            mother_scholarity: 'unlettered_elementary_one_incomplete',
            people_in_home: 4
        },
        family_cohesion_record: {
            family_mutual_aid_freq: 'almost_never',
            friendship_approval_freq: 'almost_never',
            family_only_task_freq: 'almost_never',
            family_only_preference_freq: 'almost_never',
            free_time_together_freq: 'almost_never',
            family_proximity_perception_freq: 'almost_never',
            all_family_tasks_freq: 'almost_never',
            family_tasks_opportunity_freq: 'almost_never',
            family_decision_support_freq: 'almost_never',
            family_union_relevance_freq: 'almost_never',
            family_cohesion_result: 45
        },
        oral_health_record: {
            teeth_brushing_freq: 'none',
            teeth_lesions: [
                {
                    tooth_type: 'deciduous_tooth',
                    lesion_type: 'white_spot_lesion'
                },
                {
                    tooth_type: 'deciduous_tooth',
                    lesion_type: 'cavitated_lesion'
                },
                {
                    tooth_type: 'permanent_tooth',
                    lesion_type: 'white_spot_lesion'
                },
                {
                    tooth_type: 'permanent_tooth',
                    lesion_type: 'cavitated_lesion'
                }
            ]
        },
        health_professional_id: '5c86d00cfc25e7036d51d652',
        pilotstudy_id: '5c86d00c2239a48ea20a0134'
    }

    public static AGE_BMI_PERCENTILE = {
        age: '8a9m',
        p01: 12.3,
        p3: 13.4,
        p85: 17.5,
        p97: 19.4,
        p999: 23.1
    }

    public static AGE_HEIGHT_PERCENTILE = {
        age: 8,
        height: 118,
        percentile: 5
    }

    public static AGE_SYSTOLIC_DIASTOLIC_PERCENTILE = {
        age: 8,
        percentile: 50,
        pas_5: 94,
        pas_10: 95,
        pas_25: 97,
        pas_50: 99,
        pas_75: 100,
        pas_90: 102,
        pas_95: 102,
        pad_5: 56,
        pad_10: 57,
        pad_25: 58,
        pad_50: 59,
        pad_75: 60,
        pad_90: 60,
        pad_95: 61
    }

    public static BLOOD_GLUCOSE_MEASUREMENT = {
        value: 146,
        unit: 'mg/dl',
        meal: 'preprandial',
        type: 'blood_glucose',
        timestamp: '2018-11-19T14:40:00Z',
        device_id: '5ca790f77aefffa37a17b605'
    }

    public static BLOOD_GLUCOSE = {
        value: 99,
        meal: 'prepandial',
        classification: 'great',
        zones: [{
            preprandial: {
                good: {
                    min: 65,
                    max: 100
                },
                great: {
                    min: 90,
                    max: 145
                }
            },
            postprandial: {
                good: {
                    min: 80,
                    max: 126
                },
                great: {
                    min: 90,
                    max: 180
                }
            },
            bedtime: {
                good: {
                    min: 80,
                    max: 126
                },
                great: {
                    min: 90,
                    max: 180
                }
            },
            glycated_hemoglobin: {
                good: {
                    min: 4.5,
                    max: 6.5
                },
                great: {
                    min: 5.7,
                    max: 7.5
                }
            }
        }
        ]
    }

    public static BLOOD_PRESSURE_MEASUREMENT = {
        systolic: 121,
        diastolic: 78,
        pulse: 80,
        unit: 'mmHg',
        type: 'blood_pressure',
        timestamp: '2018-11-19T14:40:00Z',
        device_id: '5ca790f77aefffa37a17b605'
    }

    public static BLOOD_PRESSURE_PER_AGE_HEIGHT = {
        blood_pressure_per_age_boys: [DefaultEntityMock.AGE_HEIGHT_PERCENTILE],
        blood_pressure_per_age_girls: [DefaultEntityMock.AGE_HEIGHT_PERCENTILE]
    }

    public static BLOOD_PRESSURE = {
        systolic: 94,
        diastolic: 56,
        systolic_percentile: 'pas5',
        diastolic_percentile: 'pad5',
        classification: 'normal'
    }

    public static BODY_TEMPERATURE_MEASUREMENT = {
        value: 36,
        unit: '°C',
        type: 'body_temperature',
        timestamp: '2018-11-19T14:40:00Z',
        device_id: '5ca790f77aefffa37a17b605'
    }

    public static FAT_MEASUREMENT = {
        value: 20,
        unit: '%',
        type: 'fat',
        timestamp: '2018-11-17T14:40:00Z',
        device_id: '5ca790f77aefffa37a17b605'
    }

    public static HEART_RATE_MEASUREMENT = {
        dataset: [
            {
                value: 90,
                timestamp: '2018-11-19T14:40:00Z'
            },
            {
                value: 87,
                timestamp: '2018-11-19T14:41:00Z'
            },
            {
                value: 89,
                timestamp: '2018-11-19T14:42:00Z'
            },
            {
                value: 90,
                timestamp: '2018-11-19T14:43:00Z'
            },
            {
                value: 91,
                timestamp: '2018-11-19T14:44:00Z'
            }
        ],
        unit: 'bpm',
        type: 'heart_rate',
        device_id: '5ca790f77aefffa37a17b605'
    }

    public static HEIGHT_MEASUREMENT = {
        value: 155,
        unit: 'cm',
        type: 'height',
        timestamp: '2018-11-19T14:40:00Z',
        device_id: '5ca790f77aefffa37a17b605'
    }

    public static WAIST_CIRCUMFERENCE_MEASUREMENT = {
        value: 70,
        unit: 'cm',
        type: 'waist_circumference',
        timestamp: '2018-11-19T14:40:00Z',
        device_id: '5ca790f77aefffa37a17b605'
    }

    public static WEIGHT_MEASUREMENT = {
        value: 50,
        unit: 'kg',
        type: 'weight',
        timestamp: '2018-11-19T14:40:00Z',
        fat: {
            value: 30,
            unit: '%'
        },
        device_id: '5ca790f77aefffa37a17b605'
    }

    public static PHYSICAL_ACTIVITY_HABITS = {
        school_activity_freq: 'four_more_per_week',
        weekly_activities: [
            'run',
            'swim'
        ]
    }

    public static FEEDING_HABITS_RECORD = {
        weekly_feeding_habits: [
            {
                food: 'fish_chicken_meat',
                seven_days_freq: 'one_two_days'
            },
            {
                food: 'soda',
                seven_days_freq: 'one_two_days'
            },
            {
                food: 'salad_vegetable',
                seven_days_freq: 'three_four_days'
            },
            {
                food: 'fried_salt_food',
                seven_days_freq: 'one_two_days'
            },
            {
                food: 'milk',
                seven_days_freq: 'three_four_days'
            },
            {
                food: 'bean',
                seven_days_freq: 'all_days'
            },
            {
                food: 'fruits',
                seven_days_freq: 'all_days'
            },
            {
                food: 'candy_sugar_cookie',
                seven_days_freq: 'one_two_days'
            },
            {
                food: 'burger_sausage',
                seven_days_freq: 'one_two_days'
            }
        ],
        daily_water_glasses: 'five_more',
        six_month_breast_feeding: 'complementary',
        food_allergy_intolerance: [
            'gluten',
            'other'
        ],
        breakfast_daily_frequency: 'everyday'
    }

    public static MEDICAL_RECORD = {
        chronic_diseases: [
            {
                type: 'hypertension',
                disease_history: 'yes'
            }
        ]
    }

    public static SLEEP_HABIT = {
        week_day_sleep: 22,
        week_day_wake_up: 8
    }
}
