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
                weight,
            });

            return record;
        } catch (error: any) {
            throw new Error(error.message);
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
            const record_temp = await this.record.findById(_id);

            if (!record_temp) {
                throw new Error('Unable to find record');
            }

            if (record_temp.account_id.toString() !== account_id.toString()) {
                throw new Error('You are not allowed to get this record');
            }

            const record = await this.record
                .findByIdAndUpdate(
                    _id,
                    {
                        glucose: glucose,
                        comment: comment,
                        date: date,
                        weight: weight,
                    },
                    { new: true }
                )
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!record) {
                throw new Error('Unable to update record with that data');
            }

            return record;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to delete record
     */

    public async delete(
        _id: Schema.Types.ObjectId,
        account_id: Schema.Types.ObjectId
    ): Promise<Record | Error> {
        try {
            const record_temp = await this.record.findById(_id);

            if (!record_temp) {
                throw new Error('Unable to delete record');
            }

            if (record_temp.account_id.toString() !== account_id.toString()) {
                throw new Error('You are not allowed to delete this record');
            }

            const record = await this.record.findByIdAndDelete(_id).populate({
                path: 'account_id',
                populate: { path: '_id' },
            });

            if (!record) {
                throw new Error('Unable to delete record with that data');
            }

            return record;
        } catch (error: any) {
            throw new Error(error.message);
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
                    sort: { date: -1 },
                })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!records) {
                throw new Error('Unable to find records');
            }

            return records;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to get statistics
     */
    public async statistics(
        account_id: Schema.Types.ObjectId
    ): Promise<Record | Array<Record> | Error | Props> {
        try {
            const records = await this.record
                .find({ account_id: account_id }, null, {
                    sort: { date: 1 },
                })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!records) {
                throw new Error('Unable to find records');
            }

            const dateNow = new Date();

            let weekAgo = new Date();
            weekAgo.setDate(dateNow.getDate() - 7);

            let monthAgo = new Date();
            monthAgo.setDate(dateNow.getDate() - 30);

            let yearAgo = new Date();
            yearAgo.setDate(dateNow.getDate() - 365);

            const recordsLastWeek = records.filter(
                (item) => item.date >= weekAgo
            ) as Array<Record>;

            const recordsLastMonth = records.filter(
                (item) => item.date >= monthAgo
            ) as Array<Record>;

            const recordsLastYear = records.filter(
                (item) => item.date >= yearAgo
            ) as Array<Record>;

            const weeklyNumberRecords = recordsLastWeek.length;
            const monthNumberRecords = recordsLastMonth.length;
            const yearNumberRecords = recordsLastYear.length;

            const weeklyMaximumGlucose = recordsLastWeek.sort(
                (prev: Record, current: Record) =>
                    prev.glucose < current.glucose ? 1 : -1
            )[0] as Record;
            const monthMaximumGlucose = recordsLastMonth.sort(
                (prev: Record, current: Record) =>
                    prev.glucose < current.glucose ? 1 : -1
            )[0] as Record;
            const yearMaximumGlucose = recordsLastYear.sort(
                (prev: Record, current: Record) =>
                    prev.glucose < current.glucose ? 1 : -1
            )[0] as Record;

            const weeklyMaximumWeight = recordsLastWeek.sort(
                (prev: Record, current: Record) =>
                    prev.weight < current.weight ? 1 : -1
            )[0] as Record;
            const monthMaximumWeight = recordsLastMonth.sort(
                (prev: Record, current: Record) =>
                    prev.weight < current.weight ? 1 : -1
            )[0] as Record;
            const yearMaximumWeight = recordsLastYear.sort(
                (prev: Record, current: Record) =>
                    prev.weight < current.weight ? 1 : -1
            )[0] as Record;

            const weeklyMinimumGlucose = recordsLastWeek.sort(
                (prev: Record, current: Record) =>
                    prev.glucose < current.glucose ? -1 : 1
            )[0] as Record;
            const monthMinimumGlucose = recordsLastMonth.sort(
                (prev: Record, current: Record) =>
                    prev.glucose < current.glucose ? -1 : 1
            )[0] as Record;
            const yearMinimumGlucose = recordsLastYear.sort(
                (prev: Record, current: Record) =>
                    prev.glucose < current.glucose ? -1 : 1
            )[0] as Record;

            const weeklyMinimumWeight = recordsLastWeek.sort(
                (prev: Record, current: Record) =>
                    prev.weight < current.weight ? -1 : 1
            )[0] as Record;
            const monthMinimumWeight = recordsLastMonth.sort(
                (prev: Record, current: Record) =>
                    prev.weight < current.weight ? -1 : 1
            )[0] as Record;
            const yearMinimumWeight = recordsLastYear.sort(
                (prev: Record, current: Record) =>
                    prev.weight < current.weight ? -1 : 1
            )[0] as Record;

            const statistics = {
                recordsLastWeek,
                recordsLastMonth,
                recordsLastYear,
                weeklyNumberRecords,
                monthNumberRecords,
                yearNumberRecords,
                weeklyMaximumGlucose,
                monthMaximumGlucose,
                yearMaximumGlucose,
                weeklyMaximumWeight,
                monthMaximumWeight,
                yearMaximumWeight,
                weeklyMinimumGlucose,
                monthMinimumGlucose,
                yearMinimumGlucose,
                weeklyMinimumWeight,
                monthMinimumWeight,
                yearMinimumWeight,
            } as Props;

            return statistics;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to find records
     */

    public async find(
        props: Props,
        account_id: Schema.Types.ObjectId
    ): Promise<Record | Array<Record> | Error> {
        try {
            props.account_id = account_id;
            const records = await this.record
                .find(props, null, { sort: { date: -1 } })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!records) {
                throw new Error('Unable to find records');
            }

            return records;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to find all records
     */
    public async adminGet(
        props: Props
    ): Promise<Record | Array<Record> | Error> {
        try {
            const record = await this.record.find(props, null, {
                sort: { date: 1 },
            });

            if (!record) {
                throw new Error('Unable to find record');
            }

            return record;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to delete record
     */

    public async adminDelete(
        _id: Schema.Types.ObjectId
    ): Promise<Record | Error> {
        try {
            const record = await this.record.findByIdAndDelete(_id);

            if (!record) {
                throw new Error('Unable to delete record with that data');
            }

            return record;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default RecordService;
