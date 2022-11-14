import { Schema, model } from 'mongoose';
import Record from '@/resources/record/record.interface';

const RecordSchema = new Schema(
    {
        glucose: {
            type: Number,
        },
        comment: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        account_id: {
            type: Schema.Types.ObjectId,
            ref: 'Accounts',
        },
        weight: {
            type: Number,
        },
    },
    { timestamps: true }
);

export default model<Record>('Records', RecordSchema);
