import Mongoose, { Schema } from 'mongoose'

interface IOdontologicEvaluation extends Mongoose.Document {
}

const ontologicEvaluationSchema = new Mongoose.Schema({
        type: { type: String },
        created_at: { type: Date },
        total_patients: {
            type: Number,
            required: 'Total of patients in odontologic evaluation is required!'
        },
        file_csv: {
            type: String,
            required: 'Link to download the .csv odontologic evaluation is required!'
        },
        file_xls: {
            type: String,
            required: 'Link to download the .xls odontologic evaluation is required!'
        },
        health_professional_id: {
            type: Schema.Types.ObjectId,
            required: 'Id of health professional responsible for odontologic evaluation is required!'
        },
        pilotstudy_id: {
            type: Schema.Types.ObjectId,
            required: 'Id of pilot study of odontologic evaluation is required!'
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

export const OdontologicEvaluationRepoModel =
    Mongoose.model<IOdontologicEvaluation>('OdontologicEvaluation', ontologicEvaluationSchema, 'evaluations')
