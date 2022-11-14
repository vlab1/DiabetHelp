import { Document } from 'mongoose';
import { Schema } from 'mongoose';
import Account from '@/resources/account/account.interface';

export default interface Menu extends Document {
    account_id: Schema.Types.ObjectId | Account;
    name: string;
}
