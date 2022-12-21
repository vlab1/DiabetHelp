import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/menu/menu.validation';
import MenuService from '@/resources/menu/menu.service';
import authenticated from '@/middleware/authenticated.middleware';
import Props from '@/utils/types/props.type';
import { Schema } from 'mongoose';
import permission from '@/middleware/admin.permission.middleware';

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
            authenticated,
            this.find
        );
        this.router.get(
            `${this.path}/calculator`,
            validationMiddleware(validate.calculator),
            authenticated,
            this.calculator
        );
        this.router.get(
            `${this.path}/admin/get`,
            validationMiddleware(validate.adminGet),
            authenticated,
            permission,
            this.adminGet
        );
        this.router.delete(
            `${this.path}/admin/delete`,
            validationMiddleware(validate.delete0),
            authenticated,
            permission,
            this.adminDelete
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name } = req.body;

            const account_id = req.account._id;

            const menu = await this.MenuService.create(account_id, name);

            res.status(201).json({ data: menu });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id, name } = req.body;

            const account_id = req.account._id;

            const menu = await this.MenuService.update(_id, name, account_id);

            res.status(200).json({ data: menu });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;
            const account_id = req.account._id;
            const menu = await this.MenuService.delete(_id, account_id);

            res.status(200).json({ data: menu });
        } catch (error: any) {
            next(new HttpException(400, error.message));
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

            res.status(200).json({ data: menu });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body as Props;
            const account_id = req.account._id;
            const menu = await this.MenuService.find(props, account_id);

            res.status(200).json({ data: menu });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private calculator = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { menu_id } = req.body;
            const account_id = req.account._id;

            const calculator = await this.MenuService.calculator(
                menu_id,
                account_id
            );

            res.status(200).json({ data: calculator });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private adminGet = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body as Props;
            const menu = await this.MenuService.adminGet(props);

            res.status(200).json({ data: menu });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private adminDelete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;
            const menu = await this.MenuService.adminDelete(_id);

            res.status(200).json({ data: menu });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default MenuController;
