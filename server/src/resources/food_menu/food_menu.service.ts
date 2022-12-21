import FoodMenuModel from '@/resources/food_menu/food_menu.model';
import MenuModel from '@/resources/menu/menu.model';
import AccountFoodModel from '@/resources/account_food/account_food.model';
import FoodMenu from '@/resources/food_menu/food_menu.interface';
import { Schema } from 'mongoose';
import Props from '@/utils/types/props.type';
import { Menu } from '@/resources/menu/menu.interface';

class FoodMenuService {
    private food_menu = FoodMenuModel;
    private menu = MenuModel;
    private account_food = AccountFoodModel;

    /**
     * Create a new food menu
     */
    public async create(
        foodModel: string,
        food_id: Schema.Types.ObjectId,
        menu_id: Schema.Types.ObjectId,
        count: number,
        equiv_type: string,
        account_id: Schema.Types.ObjectId
    ): Promise<FoodMenu | Error> {
        try {
            const food_menu_temp = await this.menu.findById(menu_id);
            const account_food_temp = await this.account_food.findById(food_id);

            if (!food_menu_temp) {
                throw new Error('Unable to find menu food');
            }

            if (
                account_food_temp &&
                account_food_temp.account_id.toString() !==
                    account_id.toString()
            ) {
                throw new Error('You are not allowed to get this menu food');
            }

            if (
                food_menu_temp.account_id.toString() !== account_id.toString()
            ) {
                throw new Error('You are not allowed to get this menu food');
            }

            const food_menu = await this.food_menu.create({
                foodModel,
                food_id,
                menu_id,
                count,
                equiv_type,
            });

            return food_menu;
        } catch (error) {
            throw new Error('Unable to create food menu');
        }
    }

    /**
     * Attempt to update food menu
     */
    public async update(
        _id: Schema.Types.ObjectId,
        foodModel: string,
        food_id: Schema.Types.ObjectId,
        menu_id: Schema.Types.ObjectId,
        count: number,
        equiv_type: string,
        account_id: Schema.Types.ObjectId
    ): Promise<FoodMenu | Error> {
        try {
            const food_menu_temp = await this.food_menu
                .findById(_id)
                .populate({
                    path: 'food_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'menu_id',
                    populate: { path: '_id' },
                });

            if (!food_menu_temp) {
                throw new Error('Unable to find menu food');
            }
            const menu = food_menu_temp.menu_id as Menu;
            if (
                food_menu_temp &&
                food_menu_temp.menu_id &&
                menu.account_id.toString() !== account_id.toString()
            ) {
                throw new Error('You are not allowed to update this menu food');
            }

            const food_menu = await this.food_menu
                .findByIdAndUpdate(
                    _id,
                    {
                        foodModel: foodModel,
                        food_id: food_id,
                        menu_id: menu_id,
                        count: count,
                        equiv_type: equiv_type,
                    },
                    { new: true }
                )
                .populate({
                    path: 'food_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'menu_id',
                    populate: { path: '_id' },
                });

            if (!food_menu) {
                throw new Error('Unable to update food menu with that data');
            }

            return food_menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to delete food menu
     */

    public async delete(
        _id: Schema.Types.ObjectId,
        account_id: Schema.Types.ObjectId
    ): Promise<FoodMenu | Error> {
        try {
            const food_menu_temp = await this.food_menu
                .findById(_id)
                .populate({
                    path: 'food_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'menu_id',
                    populate: { path: '_id' },
                });

            if (!food_menu_temp) {
                throw new Error('Unable to delete menu food');
            }
            const menu = food_menu_temp.menu_id as Menu;
            if (
                food_menu_temp &&
                food_menu_temp.menu_id &&
                menu.account_id.toString() !== account_id.toString()
            ) {
                throw new Error('You are not allowed to delete this menu food');
            }

            const food_menu = await this.food_menu
                .findByIdAndDelete(_id)
                .populate({
                    path: 'food_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'menu_id',
                    populate: { path: '_id' },
                });

            if (!food_menu) {
                throw new Error('Unable to delete food menu with that data');
            }

            return food_menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to find all food in  menu
     */
    public async get(
        menu_id: Schema.Types.ObjectId,
        account_id: Schema.Types.ObjectId
    ): Promise<FoodMenu | Array<FoodMenu> | Error> {
        try {
            const food_menu = await this.food_menu
                .find({ menu_id: menu_id }, null, {
                    sort: { name: 1 },
                })
                .populate({
                    path: 'food_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'menu_id',
                    populate: { path: '_id' },
                });

            if (!food_menu) {
                throw new Error('Unable to find food menu');
            }

            const menu = food_menu[0].menu_id as Menu;

            if (account_id.toString() !== menu.account_id.toString()) {
                throw new Error('You are not allowed to get this menu food');
            }

            return food_menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to find food menu
     */

    public async find(
        props: Props,
        account_id: Schema.Types.ObjectId
    ): Promise<FoodMenu | Array<FoodMenu> | Error> {
        try {
            const food_menu_temp = await this.menu
                .find({ account_id: account_id })
                .select(['_id'])
                .exec();

            const propertyValues = [] as Array<string>;
            food_menu_temp.map((item) => {
                propertyValues.push(item._id.toString());
            });

            props.menu_id = { $in: propertyValues };

            const food_menu = await this.food_menu
                .find(props, null, {
                    sort: { name: 1 },
                })
                .populate({
                    path: 'food_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'menu_id',
                    populate: { path: '_id' },
                });

            if (!food_menu) {
                throw new Error('Unable to find food menu');
            }

            return food_menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to find all account food
     */
    public async adminGet(): Promise<FoodMenu | Array<FoodMenu> | Error> {
        try {
            const food_menu = await this.food_menu.find({}, null, {
                sort: { name: 1 },
            });

            if (!food_menu) {
                throw new Error('Unable to find food_menu');
            }

            return food_menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to delete account food
     */

    public async adminDelete(
        _id: Schema.Types.ObjectId
    ): Promise<FoodMenu | Error> {
        try {
            const food_menu = await this.food_menu.findByIdAndDelete(_id);

            if (!food_menu) {
                throw new Error('Unable to delete food_menu with that data');
            }

            return food_menu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default FoodMenuService;
