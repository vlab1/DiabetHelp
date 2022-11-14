import FoodMenuModel from '@/resources/food_menu/food_menu.model';
import FoodMenu from '@/resources/food_menu/food_menu.interface';
import { Schema } from 'mongoose';
import Props from '@/utils/types/props.type';

class FoodMenuService {
    private food_menu = FoodMenuModel;

    /**
     * Create a new food menu
     */
    public async create(
        foodModel: string,
        food_id: Schema.Types.ObjectId,
        menu_id: Schema.Types.ObjectId,
        count: number,
        equiv_type: string
    ): Promise<FoodMenu | Error> {
        try {
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
        equiv_type: string
    ): Promise<FoodMenu | Error> {
        try {
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
                throw new Error('Unable to update food menu with thad id');
            }

            return food_menu;
        } catch (error) {
            throw new Error('Unable to change food menu');
        }
    }

    /**
     * Attempt to delete food menu
     */

    public async delete(_id: Schema.Types.ObjectId): Promise<FoodMenu | Error> {
        try {
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
                throw new Error('Unable to delete food menu with that id');
            }

            return food_menu;
        } catch (error) {
            throw new Error('Unable to delete food menu');
        }
    }

    /**
     * Attempt to find all food in  menu
     */
    public async get(
        menu_id: Schema.Types.ObjectId
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

            return food_menu;
        } catch (error) {
            throw new Error('Unable to find food menu');
        }
    }


    /**
     * Attempt to find food menu
     */

    public async find(
        props: Props
    ): Promise<FoodMenu | Array<FoodMenu> | Error> {
        try {
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
        } catch (error) {
            throw new Error('Unable to find food menu');
        }
    }
}

export default FoodMenuService;
