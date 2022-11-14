import { Document } from 'mongoose';

export default interface Food extends Document {
    name: string;
    presize_equiv: number;
    relative_equiv: number;
    presize_equiv_unit: string;
    relative_equiv_unit: string;
    presize_equiv_gCHO: number;
    relative_equiv_gCHO: number;
    type: string;
}
