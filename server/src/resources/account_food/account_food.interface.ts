import { Document, Schema } from 'mongoose';
import Account from '@/resources/account/account.interface';

export default interface AccountFood extends Document {
    name: string;
    presize_equiv: number;
    relative_equiv: number;
    presize_equiv_unit: string;
    relative_equiv_unit: string;
    presize_equiv_gCHO: number;
    relative_equiv_gCHO: number;
    account_id: Schema.Types.ObjectId | Account;
}
