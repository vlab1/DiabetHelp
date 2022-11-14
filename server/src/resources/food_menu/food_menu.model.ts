import { Schema, model } from 'mongoose';
import FoodMenu from '@/resources/food_menu/food_menu.interface';

const FoodMenuSchema = new Schema(
    {
        foodModel: {
            type: String,
            required: true,
            enum: ['Food', 'AccountFood']
          },
        food_id: {
            type: Schema.Types.ObjectId,
            refPath: 'foodModel'
        },
        menu_id: {
            type: Schema.Types.ObjectId,
            ref: "Menu"
        },
        count: {
            type: Number,
        },
        equiv_type: {
            type: String,
            trim: true,
        },

    },
    { timestamps: true }
);

export default model<FoodMenu>('FoodMenu', FoodMenuSchema);
