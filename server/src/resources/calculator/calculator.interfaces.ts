import { Document, Schema } from 'mongoose';

interface CalculatorFood extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    count: number;
    unit: string;
    gCHO: number;
}

interface  CalculatorMenu extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    food: Array<CalculatorFood>;
    total_gCHO: number;
}

export { CalculatorFood, CalculatorMenu };