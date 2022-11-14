import MenuModel from '@/resources/menu/menu.model';
import Menu from '@/resources/menu/menu.interface';
import { Schema } from 'mongoose';
import Props from '@/utils/types/props.type';

class MenuService {
    private menu = MenuModel;

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
        } catch (error) {
            throw new Error('Unable to create menu');
        }
    }

    /**
     * Attempt to update menu
     */
    public async update(
        _id: Schema.Types.ObjectId,
        account_id: Schema.Types.ObjectId,
        name: string
    ): Promise<Menu | Error> {
        try {
            const menu = await this.menu
                .findByIdAndUpdate(
                    _id,
                    {
                        account_id: account_id,
                        name: name,
                    },
                    { new: true }
                )
                .populate({
                    path: 'account_id',
                    populate: { path: '_id' },
                });

            if (!menu) {
                throw new Error('Unable to update menu with thad id');
            }

            return menu;
        } catch (error) {
            throw new Error('Unable to change menu');
        }
    }

    /**
     * Attempt to delete menu
     */

    public async delete(_id: Schema.Types.ObjectId): Promise<Menu | Error> {
        try {
            const menu = await this.menu.findByIdAndDelete(_id).populate({
                path: 'account_id',
                populate: { path: '_id' },
            });

            if (!menu) {
                throw new Error('Unable to delete menu with that id');
            }

            return menu;
        } catch (error) {
            throw new Error('Unable to delete menu');
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
        } catch (error) {
            throw new Error('Unable to find menu');
        }
    }

    /**
     * Attempt to find menu
     */

    public async find(props: Props): Promise<Menu | Array<Menu> | Error> {
        try {
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
        } catch (error) {
            throw new Error('Unable to find menu');
        }
    }
}

export default MenuService;
