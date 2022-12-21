import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/food_menu/food_menu.validation';
import FoodMenuService from '@/resources/food_menu/food_menu.service';
import authenticated from '@/middleware/authenticated.middleware';
import Props from '@/utils/types/props.type';
import permission from '@/middleware/admin.permission.middleware';

class FoodMenuController implements Controller {
    public path = '/food-menu';
    public router = Router();
    private FoodMenuService = new FoodMenuService();

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
        this.router.get(
            `${this.path}`,
            authenticated,
            validationMiddleware(validate.get),
            this.get
        );
        this.router.get(
            `${this.path}/find`,
            authenticated,
            validationMiddleware(validate.find),
            this.find
        );
        this.router.get(
            `${this.path}/admin/get`,
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
            const { foodModel, food_id, menu_id, count, equiv_type } = req.body;

            const account_id = req.account._id;

            const food_menu = await this.FoodMenuService.create(
                foodModel,
                food_id,
                menu_id,
                count,
                equiv_type,
                account_id
            );

            res.status(201).json({ data: food_menu });
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
            const { _id, foodModel, food_id, menu_id, count, equiv_type } =
                req.body;

            const account_id = req.account._id;

            const food_menu = await this.FoodMenuService.update(
                _id,
                foodModel,
                food_id,
                menu_id,
                count,
                equiv_type,
                account_id
            );

            res.status(200).json({ data: food_menu });
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
            const food_menu = await this.FoodMenuService.delete(
                _id,
                account_id
            );

            res.status(200).json({ data: food_menu });
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
            const { menu_id } = req.body;
            const account_id = req.account._id;

            const food_menu = await this.FoodMenuService.get(
                menu_id,
                account_id
            );

            res.status(200).json({ data: food_menu });
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
            const food_menu = await this.FoodMenuService.find(
                props,
                account_id
            );

            res.status(200).json({ data: food_menu });
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
            const food_menu = await this.FoodMenuService.adminGet();

            res.status(200).json({ data: food_menu });
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
            const food_menu = await this.FoodMenuService.adminDelete(_id);

            res.status(200).json({ data: food_menu });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default FoodMenuController;
