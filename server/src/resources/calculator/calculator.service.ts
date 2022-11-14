import { Schema } from 'mongoose';
import MenuModel from '@/resources/menu/menu.model';
import FoodMenuModel from '@/resources/food_menu/food_menu.model';
import Food from '@/resources/food/food.interface';
import AccountFood from '@/resources/account_food/account_food.interface';
import FoodMenu from '@/resources/food_menu/food_menu.interface';
import {CalculatorMenu, CalculatorFood}  from '@/resources/calculator/calculator.interfaces';

class CalculatorService {
    private menu = MenuModel;
    private food_menu = FoodMenuModel;

    /**
     * Attempt to find all menu
     */
    public async get(
        menu_id: Schema.Types.ObjectId
    ): Promise<CalculatorMenu | Array<CalculatorMenu> | Error> {
        try {
            const menu = await this.menu
                .findOne({ menu_id: menu_id })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                })
                .select(['-account_id', '-createdAt', '-updatedAt', '-__v'])
                .exec();

            const food_menu = await this.food_menu
                .find({ menu_id }, null, {
                    sort: { name: 1 },
                })
                .populate({
                    path: 'food_id',
                    populate: { path: '_id' },
                    select: {
                        name: 1,
                        presize_equiv: 1,
                        relative_equiv: 1,
                        presize_equiv_unit: 1,
                        relative_equiv_unit: 1,
                        presize_equiv_gCHO: 1,
                        relative_equiv_gCHO: 1,
                    },
                })
                .select(['-menu_id', '-createdAt', '-updatedAt', '-__v'])
                .exec();

            if (!food_menu) {
                throw new Error('Unable to find food menu');
            }

            if (!menu) {
                throw new Error('Unable to find menu');
            }

            let calculatorMenu = {} as CalculatorMenu;

            const foodArray = [] as Array<CalculatorFood>;

            food_menu.map((item: FoodMenu) => {
                const food = {} as CalculatorFood;
                food._id = item._id;
                food.count = item.count;
                const foodItem = item.food_id as Food | AccountFood;
                food.name = foodItem.name;
                if (item.equiv_type === 'relative') {
                    food.unit = foodItem.relative_equiv_unit;
                    food.gCHO = parseFloat(
                        (
                            (foodItem.relative_equiv_gCHO * item.count) /
                            foodItem.relative_equiv
                        ).toFixed(1)
                    );
                } else {
                    food.unit = foodItem.presize_equiv_unit;
                    food.gCHO = parseFloat(
                        (
                            (foodItem.presize_equiv_gCHO * item.count) /
                            foodItem.presize_equiv
                        ).toFixed(1)
                    );
                }
                foodArray.push(food);
            });

            calculatorMenu._id = menu._id;
            calculatorMenu.name = menu.name;
            calculatorMenu.total_gCHO = foodArray.map(item => item.gCHO).reduce((prev, next) => prev + next);
            calculatorMenu.food = foodArray;

            return calculatorMenu;
        } catch (error) {
            throw new Error('Unable to calculate the food on the menu');
        }
    }
}

export default CalculatorService;
