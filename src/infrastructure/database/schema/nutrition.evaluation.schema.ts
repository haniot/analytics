import Mongoose, { Schema } from 'mongoose'

interface INutritionEvaluation extends Mongoose.Document {
}

const nutritionEvaluationSchema = new Mongoose.Schema({
        type: {
            type: String
        },
        status: {
            type: String,
            required: 'Status of nutrition evaluation is required!'
        },
        created_at: {
            type: String
        },
        patient_id: {
            type: Schema.Types.ObjectId,
            required: 'Id of patient of nutrition evaluation is required!'
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
            waist_height_relation: {
                type: Number,
                required: 'Waist-height relation of overweight indicator is required!'
            },
            classification: {
                type: String,
                required: 'Classification of overweight indicator is required!'
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
                }
            }]
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
