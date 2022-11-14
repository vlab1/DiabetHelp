import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/account_food/account_food.validation';
import AccountFoodService from '@/resources/account_food/account_food.service';
import authenticated from '@/middleware/authenticated.middleware';
import Props from '@/utils/types/props.type';

class AccountFoodController implements Controller {
    public path = '/account-food';
    public router = Router();
    private AccountFoodService = new AccountFoodService();

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
            const {
                name,
                presize_equiv,
                relative_equiv,
                presize_equiv_unit,
                relative_equiv_unit,
                presize_equiv_gCHO,
                relative_equiv_gCHO,
                account_id,
            } = req.body;

            const  creator_id  = req.account._id;

            const account_food = await this.AccountFoodService.create(
                name,
                presize_equiv,
                relative_equiv,
                presize_equiv_unit,
                relative_equiv_unit,
                presize_equiv_gCHO,
                relative_equiv_gCHO,
                account_id ? account_id : creator_id
            );

            res.status(201).json({ account_food });
        } catch (error) {
            next(new HttpException(400, 'Cannot create account food'));
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
                account_id,
            } = req.body;

            const account_food = await this.AccountFoodService.update(
                _id,
                name,
                presize_equiv,
                relative_equiv,
                presize_equiv_unit,
                relative_equiv_unit,
                presize_equiv_gCHO,
                relative_equiv_gCHO,
                account_id,
            );

            res.status(200).json({ account_food });
        } catch (error) {
            next(new HttpException(400, 'Cannot update account food'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.body;

            const account_food = await this.AccountFoodService.delete(_id);

            res.status(200).json({ account_food });
        } catch (error) {
            next(new HttpException(400, 'Cannot delete account food'));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const  account_id  = req.account._id;

            const account_food = await this.AccountFoodService.get(account_id);

            res.status(200).json({ account_food });
        } catch (error) {
            next(new HttpException(400, 'Cannot found account food'));
        }
    };

    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body as Props;

            const account_food = await this.AccountFoodService.find(props);

            res.status(200).json({ account_food });
        } catch (error) {
            next(new HttpException(400, 'Cannot found account_food'));
        }
    };
}

export default AccountFoodController;
