import { Schema, model } from 'mongoose';
import AccountFood from '@/resources/account_food/account_food.interface';
import FoodMenuModel from '../food_menu/food_menu.model';

const AccountFoodSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        presize_equiv: {
            type: Number,
        },
        relative_equiv: {
            type: Number,
        },
        presize_equiv_unit: {
            type: String,
            trim: true,
        },
        relative_equiv_unit: {
            type: String,
            trim: true,
        },
        presize_equiv_gCHO: {
            type: Number,
        },
        relative_equiv_gCHO: {
            type: Number,
        },
        account_id: {
            type: Schema.Types.ObjectId,
            ref: 'Accounts',
        },
    },
    { timestamps: true }
);

AccountFoodSchema.post('findOneAndDelete', async function (result, next) {
    await FoodMenuModel.deleteMany({ food_id: result._id });
    next();
});

AccountFoodSchema.pre(
    'deleteMany',
    { document: false, query: true },
    async function (next) {
        const docs = await this.model.find(this.getFilter());
        if (docs) {
            const accounts = docs.map((item) => item._id);
            await FoodMenuModel.deleteMany({ account_id: { $in: accounts } });
        }
        next();
    }
);

export default model<AccountFood>('AccountFood', AccountFoodSchema);
