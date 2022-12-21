import { Schema, model } from 'mongoose';
import Food from '@/resources/food/food.interface';
import FoodMenuModel from '../food_menu/food_menu.model';

const FoodSchema = new Schema(
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
        type: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

FoodSchema.post('findOneAndDelete', async function (result, next) {
    await FoodMenuModel.deleteMany({ food_id: result._id });
    next();
});

export default model<Food>('Food', FoodSchema);
