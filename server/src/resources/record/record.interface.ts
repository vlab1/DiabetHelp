import { Document } from 'mongoose';
import { Schema } from 'mongoose';
import Account from '@/resources/account/account.interface';

export default interface Record extends Document {
    glucose: number;
    comment: string;
    date: Date;
    account_id: Schema.Types.ObjectId | Account;
    weight: number;
}
