import Mongoose, { Schema } from 'mongoose'

interface IOdontologicEvaluation extends Mongoose.Document {
}

const dataSchema = new Mongoose.Schema({
        type: { type: String },
        created_at: { type: Date },
        total_patients: {
            type: Number,
            required: 'Total of patients in pilot study data is required!'
        },
        file_csv: {
            type: String,
            required: 'Link to download the .csv data is required!'
        },
        file_xls: {
            type: String,
            required: 'Link to download the .xls data is required!'
        },
        pilotstudy_id: {
            type: Schema.Types.ObjectId,
            required: 'Id of pilot study of data is required!'
        },
        data_types: [{ type: String }],
        patients: [{ type: String }]
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

export const DataRepoModel =
    Mongoose.model<IOdontologicEvaluation>('Data', dataSchema, 'data')
