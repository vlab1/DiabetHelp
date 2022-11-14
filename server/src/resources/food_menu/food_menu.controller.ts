import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/food_menu/food_menu.validation';
import FoodMenuService from '@/resources/food_menu/food_menu.service';
import authenticated from '@/middleware/authenticated.middleware';
import Props from '@/utils/types/props.type';

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
            validationMiddleware(validate.get),
            this.get
        );
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
            const { foodModel, food_id, menu_id, count, equiv_type } = req.body;

            const food_menu = await this.FoodMenuService.create(
                foodModel,
                food_id,
                menu_id,
                count,
                equiv_type
            );

            res.status(201).json({ food_menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot create food menu'));
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

            const food_menu = await this.FoodMenuService.update(
                _id,
                foodModel,
                food_id,
                menu_id,
                count,
                equiv_type
            );

            res.status(200).json({ food_menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot update food menu'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;

            const food_menu = await this.FoodMenuService.delete(_id);

            res.status(200).json({ food_menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot delete food menu'));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { menu_id } = req.body;

            const food_menu = await this.FoodMenuService.get(menu_id);

            res.status(200).json({ food_menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot found food menu'));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body as Props;

            const food_menu = await this.FoodMenuService.find(props);

            res.status(200).json({ food_menu });
        } catch (error) {
            next(new HttpException(400, 'Cannot found food menu'));
        }
    };
}

export default FoodMenuController;
