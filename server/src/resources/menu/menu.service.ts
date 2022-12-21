import MenuModel from '@/resources/menu/menu.model';
import {
    Menu,
    CalculatorFood,
    CalculatorMenu,
} from '@/resources/menu/menu.interface';
import { Schema } from 'mongoose';
import Props from '@/utils/types/props.type';
import FoodMenuModel from '@/resources/food_menu/food_menu.model';
import Food from '@/resources/food/food.interface';
import AccountFood from '@/resources/account_food/account_food.interface';
import FoodMenu from '@/resources/food_menu/food_menu.interface';

class MenuService {
    private menu = MenuModel;
    private food_menu = FoodMenuModel;

    /**
     * Create a new menu
     */
    public async create(
        account_id: Schema.Types.ObjectId,
        name: string
    ): Promise<Menu | Error> {
        try {
            const menu = await this.menu.create({
                account_id,
                name,
            });

            return menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to update menu
     */
    public async update(
        _id: Schema.Types.ObjectId,
        name: string,
        account_id: Schema.Types.ObjectId
    ): Promise<Menu | Error> {
        try {
            const menu_temp = await this.menu.findById(_id);

            if (!menu_temp) {
                throw new Error('Unable to find menu');
            }

            if (menu_temp.account_id.toString() !== account_id.toString()) {
                throw new Error('You are not allowed to get this menu food');
            }

            const menu = await this.menu
                .findByIdAndUpdate(
                    _id,
                    {
                        name: name,
                    },
                    { new: true }
                )
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!menu) {
                throw new Error('Unable to update menu with that data');
            }

            return menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to delete menu
     */

    public async delete(
        _id: Schema.Types.ObjectId,
        account_id: Schema.Types.ObjectId
    ): Promise<Menu | Error> {
        try {
            const menu_temp = await this.menu.findById(_id);

            if (!menu_temp) {
                throw new Error('Unable to delete menu');
            }

            if (menu_temp.account_id.toString() !== account_id.toString()) {
                throw new Error('You are not allowed to delete this menu food');
            }

            const menu = await this.menu.findByIdAndDelete(_id).populate({
                path: 'account_id',
                populate: { path: '_id' },
            });

            if (!menu) {
                throw new Error('Unable to delete menu with that data');
            }

            return menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to find all menu
     */
    public async get(
        account_id: Schema.Types.ObjectId
    ): Promise<Menu | Array<Menu> | Error> {
        try {
            const menu = await this.menu
                .find({ account_id: account_id }, null, {
                    sort: { createdAt: -1 },
                })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!menu) {
                throw new Error('Unable to find menu');
            }

            return menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to find menu
     */

    public async find(
        props: Props,
        account_id: Schema.Types.ObjectId
    ): Promise<Menu | Array<Menu> | Error> {
        try {
            props.account_id = account_id;

            const menu = await this.menu
                .find(props, null, { sort: { name: 1 } })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!menu) {
                throw new Error('Unable to find menu');
            }

            return menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to calculate menu
     */
    public async calculator(
        menu_id: Schema.Types.ObjectId,
        account_id: Schema.Types.ObjectId
    ): Promise<CalculatorMenu | Array<CalculatorMenu> | Error> {
        try {
            const menu_temp = await this.menu.findById(menu_id);

            if (!menu_temp) {
                throw new Error('Unable to find menu');
            }

            if (menu_temp.account_id.toString() !== account_id.toString()) {
                throw new Error('You are not allowed to get this menu food');
            }

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
            calculatorMenu.total_gCHO = foodArray
                .map((item) => item.gCHO)
                .reduce((prev, next) => prev + next);
            calculatorMenu.food = foodArray;

            return calculatorMenu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to find all account food
     */
    public async adminGet(props: Props): Promise<Menu | Array<Menu> | Error> {
        try {
            const menu = await this.menu.find(props, null, {
                sort: { name: 1 },
            });

            if (!menu) {
                throw new Error('Unable to find menu');
            }

            return menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to delete account food
     */

    public async adminDelete(
        _id: Schema.Types.ObjectId
    ): Promise<Menu | Error> {
        try {
            const menu = await this.menu.findByIdAndDelete(_id);

            if (!menu) {
                throw new Error('Unable to delete menu with that data');
            }

            return menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default MenuService;
