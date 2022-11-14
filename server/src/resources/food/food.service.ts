import FoodModel from '@/resources/food/food.model';
import Food from '@/resources/food/food.interface';
import { Schema } from 'mongoose';
import Props from '@/utils/types/props.type';

class FoodService {
    private food = FoodModel;

    /**
     * Create a new Food
     */
    public async create(
        name: string,
        presize_equiv: number,
        relative_equiv: number,
        presize_equiv_unit: string,
        relative_equiv_unit: string,
        presize_equiv_gCHO: number,
        relative_equiv_gCHO: number,
        type: string
    ): Promise<Food | Error> {
        try {
            const food = await this.food.create({
                name,
                presize_equiv,
                relative_equiv,
                presize_equiv_unit,
                relative_equiv_unit,
                presize_equiv_gCHO,
                relative_equiv_gCHO,
                type,
            });

            return food;
        } catch (error) {
            throw new Error('Unable to create food');
        }
    }

    /**
     * Attempt to update food
     */
    public async update(
        _id: Schema.Types.ObjectId,
        name: string,
        presize_equiv: number,
        relative_equiv: number,
        presize_equiv_unit: string,
        relative_equiv_unit: string,
        presize_equiv_gCHO: number,
        relative_equiv_gCHO: number,
        type: string
    ): Promise<Food | Error> {
        try {
            const food = await this.food.findByIdAndUpdate(
                _id,
                {
                    name: name,
                    presize_equiv: presize_equiv,
                    relative_equiv: relative_equiv,
                    presize_equiv_unit:  presize_equiv_unit,
                    relative_equiv_unit: relative_equiv_unit,
                    presize_equiv_gCHO: presize_equiv_gCHO,
                    relative_equiv_gCHO: relative_equiv_gCHO,
                    type: type,
                },
                { new: true }
            );

            if (!food) {
                throw new Error('Unable to update food with thad id');
            }

            return food;
        } catch (error) {
            throw new Error('Unable to change food');
        }
    }

    /**
     * Attempt to delete food
     */

    public async delete(_id: Schema.Types.ObjectId): Promise<Food | Error> {
        try {
            const food = await this.food.findByIdAndDelete(_id);

            if (!food) {
                throw new Error('Unable to delete food with that id');
            }

            return food;
        } catch (error) {
            throw new Error('Unable to delete food');
        }
    }

    /**
     * Attempt to find all account food
     */
    public async get(): Promise<Food | Array<Food> | Error> {
        try {
            const food = await this.food.find({}, null, {
                sort: { name: 1 },
            });

            if (!food) {
                throw new Error('Unable to find food');
            }

            return food;
        } catch (error) {
            throw new Error('Unable to find food');
        }
    }

    /**
     * Attempt to find food
     */

    public async find(props: Props): Promise<Food | Array<Food> | Error> {
        try {
            const food = await this.food.find(props, null, {
                sort: { name: 1 },
            });

            if (!food) {
                throw new Error('Unable to find food');
            }

            return food;
        } catch (error) {
            throw new Error('Unable to find food');
        }
    }
}

export default FoodService;
