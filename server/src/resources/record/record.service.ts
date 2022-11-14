import RecordModel from '@/resources/record/record.model';
import Record from '@/resources/record/record.interface';
import { Schema } from 'mongoose';
import Props from '@/utils/types/props.type';

class RecordService {
    private record = RecordModel;

    /**
     * Create a new Record
     */
    public async create(
        glucose: number,
        comment: string,
        date: Date,
        account_id: Schema.Types.ObjectId,
        weight: number
    ): Promise<Record | Error> {
        try {
            const record = await this.record.create({
                glucose,
                comment,
                date,
                account_id,
                weight
            });

            return record;
        } catch (error) {
            throw new Error('Unable to create record');
        }
    }

    /**
     * Attempt to update record
     */
    public async update(
        _id: Schema.Types.ObjectId,
        glucose: number,
        comment: string,
        date: Date,
        account_id: Schema.Types.ObjectId,
        weight: number
    ): Promise<Record | Error> {
        try {
            const record = await this.record
                .findByIdAndUpdate(
                    _id,
                    {
                        glucose: glucose,
                        comment: comment,
                        date: date,
                        account_id: account_id,
                        weight: weight,
                    },
                    { new: true }
                )
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!record) {
                throw new Error('Unable to update record with thad id');
            }

            return record;
        } catch (error) {
            throw new Error('Unable to change record');
        }
    }

    /**
     * Attempt to delete record
     */

    public async delete(_id: Schema.Types.ObjectId): Promise<Record | Error> {
        try {
            const record = await this.record.findByIdAndDelete(_id).populate({
                path: 'account_id',
                populate: { path: '_id' },
            });

            if (!record) {
                throw new Error('Unable to delete record with that id');
            }

            return record;
        } catch (error) {
            throw new Error('Unable to delete record');
        }
    }

    /**
     * Attempt to find all account records
     */
    public async get(
        account_id: Schema.Types.ObjectId
    ): Promise<Record | Array<Record> | Error> {
        try {
            const records = await this.record
                .find({ account_id: account_id }, null, {
                    sort: { createdAt: -1 },
                })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!records) {
                throw new Error('Unable to find records');
            }

            return records;
        } catch (error) {
            throw new Error('Unable to find records');
        }
    }

    /**
     * Attempt to find records
     */

    public async find(props: Props): Promise<Record | Array<Record> | Error> {
        try {
            const records = await this.record
                .find(props, null, { sort: { createdAt: -1 } })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!records) {
                throw new Error('Unable to find records');
            }

            return records;
        } catch (error) {
            throw new Error('Unable to find records');
        }
    }
}

export default RecordService;
