import { Document } from 'mongoose';
import { Schema } from 'mongoose';
import Account from '@/resources/account/account.interface';

interface CalculatorFood extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    count: number;
    unit: string;
    gCHO: number;
}

interface CalculatorMenu extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    food: Array<CalculatorFood>;
    total_gCHO: number;
}

interface Menu extends Document {
    account_id: Schema.Types.ObjectId | Account;
    name: string;
}

export { CalculatorFood, CalculatorMenu, Menu };
