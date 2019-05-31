import Mongoose, { Schema } from 'mongoose'

interface INutritionEvaluation extends Mongoose.Document {
}

const nutritionEvaluationSchema = new Mongoose.Schema({
        type: { type: String },
        status: {
            type: String,
            required: 'Status of nutrition evaluation is required!'
        },
        created_at: { type: Date },
        patient: {
            id: {
                type: Schema.Types.ObjectId
            },
            email: { /* Common parameter between admin, patient and health professional. */
                type: String
            }, /* Health Professional parameters*/
            name: {
                type: String
            },
            gender: {
                type: String
            },
            birth_date: {
                type: String
            },
            pilotstudy_id: {
                type: Schema.Types.ObjectId,
                ref: 'PilotStudy'
            }
        },
        pilotstudy_id: {
            type: Schema.Types.ObjectId,
            required: 'Id of pilot study of nutrition evaluation is required!'
        },
        health_professional_id: {
            type: Schema.Types.ObjectId,
            required: 'Id of health professional responsible for nutrition evaluation is required!'
        },
        nutritional_status: {
            height: {
                type: Number,
                required: 'Value of height measurement is required!'
            },
            weight: {
                type: Number,
                required: 'Value of weight measurement is required!'
            },
            bmi: {
                type: Number,
                required: 'BMI of nutrition status is required!'
            },
            percentile: {
                type: String,
                required: 'Percentile of nutrition status is required!'
            },
            classification: {
                type: String,
                required: 'Classification of nutritional status is required!'
            }
        },
        overweight_indicator: {
            waist_circumference: {
                type: Number,
                description: 'Value of waist circumference measurement is required!'
            },
            height: {
                type: Number,
                required: 'Value of height measurement is required!'
            },
            waist_height_relation: {
                type: Number,
                required: 'Waist-height relation of overweight indicator is required!'
            },
            classification: {
                type: String,
                required: 'Classification of overweight indicator is required!'
            }
        },
        taylor_cut_point: {
            waist_circumference: {
                type: Number,
                description: 'Value of waist circumference measurement is required!'
            },
            classification: {
                type: String,
                required: 'Classification of taylor cut point is required!'
            }
        },
        heart_rate: {
            min: {
                type: Number,
                required: 'Min value of heart rate is required!'
            },
            max: {
                type: Number,
                required: 'Max value of heart rate is required!'
            },
            average: {
                type: Number,
                required: 'Average value of heart rate is required!'
            },
            dataset: [{
                value: {
                    type: Number,
                    required: 'Value of heart rate measurement is required!'
                },
                timestamp: {
                    type: Date,
                    required: 'Timestamp of heart rate measurement is required!'
                }
            }]
        },
        blood_glucose: {
            value: {
                type: Number,
                required: 'Value of blood glucose is required!'
            },
            meal: {
                type: String,
                required: 'Period of blood glucose  collection is required!'
            },
            classification: {
                type: String,
                required: 'Classification of blood glucose is required!'
            },
            zones: [{
                preprandial: {
                    good: {
                        min: {
                            type: Number,
                            required: 'Min value for good preprandial meal is required!'
                        },
                        max: {
                            type: Number,
                            required: 'Max value for good preprandial meal is required!'
                        }
                    },
                    great: {
                        min: {
                            type: Number,
                            required: 'Min value for great preprandial meal is required!'
                        },
                        max: {
                            type: Number,
                            required: 'Max value for great preprandial meal is required!'
                        }
                    }
                },
                postprandial: {
                    good: {
                        min: {
                            type: Number,
                            required: 'Min value for good postprandial meal is required!'
                        },
                        max: {
                            type: Number,
                            required: 'Max value for good postprandial meal is required!'
                        }
                    },
                    great: {
                        min: {
                            type: Number,
                            required: 'Min value for great postprandial meal is required!'
                        },
                        max: {
                            type: Number,
                            required: 'Max value for great postprandial meal is required!'
                        }
                    }
                },
                bedtime: {
                    good: {
                        min: {
                            type: Number,
                            required: 'Min value for good bedtime is required!'
                        },
                        max: {
                            type: Number,
                            required: 'Max value for good bedtime is required!'
                        }
                    },
                    great: {
                        min: {
                            type: Number,
                            required: 'Min value for great bedtime is required!'
                        },
                        max: {
                            type: Number,
                            required: 'Max value for great bedtime is required!'
                        }
                    }
                },
                glycated_hemoglobin: {
                    good: {
                        min: {
                            type: Number,
                            required: 'Min value for good glycated hemoglobin is required!'
                        },
                        max: {
                            type: Number,
                            required: 'Max value for good glycated hemoglobin is required!'
                        }
                    },
                    great: {
                        min: {
                            type: Number,
                            required: 'Min value for glycated hemoglobin meal is required!'
                        },
                        max: {
                            type: Number,
                            required: 'Max value for glycated hemoglobin meal is required!'
                        }
                    }
                }
            }]
        },
        blood_pressure: {
            systolic: {
                type: Number,
                required: 'Value of systolic blood pressure is required!'
            },
            diastolic: {
                type: Number,
                required: 'Value of diastolic blood pressure is required!'
            },
            systolic_percentile: {
                type: String,
                required: 'Systolic blood pressure classification is required!'
            },
            diastolic_percentile: {
                type: String,
                required: 'Diastolic blood pressure classification is required!'
            },
            classification: {
                type: String,
                required: 'Classification of blood pressure is required!'
            }
        },
        counseling: {
            suggested: {
                bmi_whr: { type: [String] },
                glycemia: { type: [String] },
                blood_pressure: { type: [String] }
            },
            definitive: {
                bmi_whr: { type: [String] },
                glycemia: { type: [String] },
                blood_pressure: { type: [String] }
            }
        },
        measurements: [{
            value: { type: Number },
            unit: { type: String },
            type: { type: String },
            timestamp: { type: Date },
            device_id: { type: Schema.Types.ObjectId },
            user_id: { type: Schema.Types.ObjectId },
            meal: { type: String },
            dataset: [{
                value: { type: Number },
                timestamp: { type: Date }
            }],
            systolic: { type: Number },
            diastolic: { type: Number },
            pulse: { type: Number },
            fat: {
                value: { type: Number },
                unit: { type: String }
            }
        }],
        physical_activity_habits: {
            patient_id: { type: Schema.Types.ObjectId },
            created_at: { type: String },
            type: { type: String },
            school_activity_freq: { type: String },
            weekly_activities: [{ type: String }]
        },
        feeding_habits_record: {
            patient_id: { type: Schema.Types.ObjectId },
            created_at: { type: String },
            type: { type: String },
            weekly_feeding_habits: [{
                food: { type: String },
                seven_days_freq: { type: String }
            }],
            daily_water_glasses: { type: String },
            six_month_breast_feeding: { type: String },
            food_allergy_intolerance: [{ type: String }],
            breakfast_daily_frequency: { type: String }
        },
        medical_record: {
            patient_id: { type: Schema.Types.ObjectId },
            created_at: { type: String },
            type: { type: String },
            chronic_diseases: [{
                type: { type: String },
                disease_history: { type: String }
            }]
        },
        sleep_habit: {
            patient_id: { type: Schema.Types.ObjectId },
            created_at: { type: String },
            type: { type: String },
            week_day_sleep: { type: String },
            week_day_wake_up: { type: String }
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: false },
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
                return ret
            }
        }
    }
)

export const NutritionEvaluationRepoModel =
    Mongoose.model<INutritionEvaluation>('NutritionEvaluation', nutritionEvaluationSchema, 'evaluations')
