import { Document, Schema } from 'mongoose';
import Food from '@/resources/food/food.interface';
import Menu from '@/resources/menu/menu.interface';
import AccountFood from '../account_food/account_food.interface';

export default interface FoodMenu extends Document {
    foodModel: string;
    food_id: Schema.Types.ObjectId | Food | AccountFood;
    menu_id: Schema.Types.ObjectId | Menu;
    count: number;
    equiv_type: string;
}
