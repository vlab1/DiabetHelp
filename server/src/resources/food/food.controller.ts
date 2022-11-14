import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/food/food.validation';
import FoodService from '@/resources/food/food.service';
import authenticated from '@/middleware/authenticated.middleware';
import Props from '@/utils/types/props.type';

class FoodController implements Controller {
    public path = '/food';
    public router = Router();
    private FoodService = new FoodService();

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
        this.router.get(`${this.path}`, this.get);
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
            const {
                name,
                presize_equiv,
                relative_equiv,
                presize_equiv_unit,
                relative_equiv_unit,
                presize_equiv_gCHO,
                relative_equiv_gCHO,
                type,
            } = req.body;

            const food = await this.FoodService.create(
                name,
                presize_equiv,
                relative_equiv,
                presize_equiv_unit,
                relative_equiv_unit,
                presize_equiv_gCHO,
                relative_equiv_gCHO,
                type
            );

            res.status(201).json({ food });
        } catch (error) {
            next(new HttpException(400, 'Cannot create food'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                _id,
                name,
                presize_equiv,
                relative_equiv,
                presize_equiv_unit,
                relative_equiv_unit,
                presize_equiv_gCHO,
                relative_equiv_gCHO,
                type,
            } = req.body;

            const food = await this.FoodService.update(
                _id,
                name,
                presize_equiv,
                relative_equiv,
                presize_equiv_unit,
                relative_equiv_unit,
                presize_equiv_gCHO,
                relative_equiv_gCHO,
                type
            );

            res.status(200).json({ food });
        } catch (error) {
            next(new HttpException(400, 'Cannot update food'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;

            const food = await this.FoodService.delete(_id);

            res.status(200).json({ food });
        } catch (error) {
            next(new HttpException(400, 'Cannot delete food'));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const food = await this.FoodService.get();

            res.status(200).json({ food });
        } catch (error) {
            next(new HttpException(400, 'Cannot found food'));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body as Props;

            const food = await this.FoodService.find(props);

            res.status(200).json({ food });
        } catch (error) {
            next(new HttpException(400, 'Cannot found food'));
        }
    };
}

export default FoodController;
