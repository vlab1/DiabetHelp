import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/menu/menu.validation';
import MenuService from '@/resources/menu/menu.service';
import authenticated from '@/middleware/authenticated.middleware';
import Props from '@/utils/types/props.type';
import { Schema } from 'mongoose';

class MenuController implements Controller {
    public path = '/menu';
    public router = Router();
    private MenuService = new MenuService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.create),
            authenticated,
            this.create
        );
        this.router.put(
            `${this.path}/update`,
            validationMiddleware(validate.update),
            authenticated,
            this.update
        );
        this.router.delete(
            `${this.path}/delete`,
            validationMiddleware(validate.delete0),
            authenticated,
            this.delete
        );
        this.router.get(`${this.path}`, authenticated, this.get);
        this.router.get(
            `${this.path}/find`,
            validationMiddleware(validate.find),
            this.find
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { account_id, name } = req.body;

            const creator_id = req.account._id;

            const menu = await this.MenuService.create(
                account_id ? account_id : creator_id,
                name
            );

            res.status(201).json({ menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot create menu'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id, account_id, name } = req.body;

            const menu = await this.MenuService.update(_id, account_id, name);

            res.status(200).json({ menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot update menu'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;

            const menu = await this.MenuService.delete(_id);

            res.status(200).json({ menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot delete menu'));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const account_id = req.account._id;

            const menu = await this.MenuService.get(account_id);

            res.status(200).json({ menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot found menu'));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body as Props;

            const menu = await this.MenuService.find(props);

            res.status(200).json({ menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot found menu'));
        }
    };
}

export default MenuController;
