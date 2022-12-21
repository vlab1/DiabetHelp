import { Schema, model } from 'mongoose';
import { Menu } from '@/resources/menu/menu.interface';
import FoodMenuModel from '../food_menu/food_menu.model';

const MenuSchema = new Schema(
    {
        account_id: {
            type: Schema.Types.ObjectId,
            ref: 'Accounts',
        },
        name: {
            type: String,
        },
    },
    { timestamps: true }
);

MenuSchema.post('findOneAndDelete', async function (result, next) {
    await FoodMenuModel.deleteMany({ menu_id: result._id });
    next();
});

MenuSchema.pre(
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

export default model<Menu>('Menu', MenuSchema);
