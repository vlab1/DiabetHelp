import AccountFoodModel from '@/resources/account_food/account_food.model';
import AccountFood from '@/resources/account_food/account_food.interface';
import { Schema } from 'mongoose';
import Props from '@/utils/types/props.type';

class AccountFoodService {
    private account_food = AccountFoodModel;

    /**
     * Create a new account food
     */
    public async create(
        name: string,
        presize_equiv: number,
        relative_equiv: number,
        presize_equiv_unit: string,
        relative_equiv_unit: string,
        presize_equiv_gCHO: number,
        relative_equiv_gCHO: number,
        account_id: Schema.Types.ObjectId
    ): Promise<AccountFood | Error> {
        try {
            const account_food = await this.account_food.create({
                name,
                presize_equiv,
                relative_equiv,
                presize_equiv_unit,
                relative_equiv_unit,
                presize_equiv_gCHO,
                relative_equiv_gCHO,
                account_id,
            });

            return account_food;
        } catch (error) {
            throw new Error('Unable to create account food');
        }
    }

    /**
     * Attempt to update account food
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
        account_id: Schema.Types.ObjectId
    ): Promise<AccountFood | Error> {
        try {
            const account_food = await this.account_food
                .findByIdAndUpdate(
                    _id,
                    {
                        name: name,
                        presize_equiv:  presize_equiv,
                        relative_equiv: relative_equiv,
                        presize_equiv_unit:  presize_equiv_unit,
                        relative_equiv_unit: relative_equiv_unit,
                        presize_equiv_gCHO: presize_equiv_gCHO,
                        relative_equiv_gCHO: relative_equiv_gCHO,
                        account_id: account_id,
                    },
                    { new: true }
                )
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!account_food) {
                throw new Error('Unable to update account food with thad id');
            }

            return account_food;
        } catch (error) {
            throw new Error('Unable to change account food');
        }
    }

    /**
     * Attempt to delete account food
     */

    public async delete(
        _id: Schema.Types.ObjectId
    ): Promise<AccountFood | Error> {
        try {
            const account_food = await this.account_food
                .findByIdAndDelete(_id)
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!account_food) {
                throw new Error('Unable to delete account food with that id');
            }

            return account_food;
        } catch (error) {
            throw new Error('Unable to delete account food');
        }
    }

    /**
     * Attempt to find all account food
     */
    public async get(
        account_id: Schema.Types.ObjectId
    ): Promise<AccountFood | Array<AccountFood> | Error> {
        try {
            const account_food = await this.account_food
                .find({ account_id: account_id }, null, {
                    sort: { name: 1 },
                })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!account_food) {
                throw new Error('Unable to find account food');
            }

            return account_food;
        } catch (error) {
            throw new Error('Unable to find account food');
        }
    }

    /**
     * Attempt to find account food
     */

    public async find(
        props: Props
    ): Promise<AccountFood | Array<AccountFood> | Error> {
        try {
            const food = await this.account_food
                .find(props, null, {
                    sort: { name: 1 },
                })
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
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

export default AccountFoodService;
