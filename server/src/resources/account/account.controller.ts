import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/account/account.validation';
import AccountService from '@/resources/account/account.service';
import authenticated from '@/middleware/authenticated.middleware';

class AccountController implements Controller {
    public path = '/account';
    public router = Router();
    private AccountService = new AccountService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.post(
            `${this.path}/google/login`,
            validationMiddleware(validate.googleLogin),
            this.googleLogin
        );
        this.router.put(
            `${this.path}/update`,
            validationMiddleware(validate.update),
            authenticated,
            this.update
        );
        this.router.put(
            `${this.path}/premium/renew`,
            validationMiddleware(validate.premiumRenew),
            authenticated,
            this.premiumRenew
        );
        this.router.put(
            `${this.path}/update/password`,
            validationMiddleware(validate.updatePassword),
            authenticated,
            this.updatePassword
        );
        this.router.delete(
            `${this.path}/delete`,
            validationMiddleware(validate.delete0),
            authenticated,
            this.delete
        );
        this.router.get(`${this.path}`, authenticated, this.getAccount);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password, name } = req.body;

            const token = await this.AccountService.register(
                email,
                password,
                name
            );

            res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.AccountService.login(email, password);

            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private googleLogin = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, passwordGoogle, name } = req.body;

            const token = await this.AccountService.googleLogin(
                email,
                passwordGoogle,
                name
            );

            res.status(200).json({ token });
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
            const {
                _id,
                name,
                email,
                password,
                passwordGoogle,
                birth_date,
                sex,
                diabetes_type,
                localization,
                //isPremium,
                high_sugar,
                low_sugar,
                premiumExpires,
            } = req.body;

            const account_id = req.account._id;

            const account = await this.AccountService.update(
                _id ? _id : account_id,
                name,
                email,
                password,
                passwordGoogle,
                birth_date,
                sex,
                diabetes_type,
                localization,
                //isPremium,
                high_sugar,
                low_sugar,
                premiumExpires
            );

            res.status(200).json({ account });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private premiumRenew = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { days } = req.body;

            const account = await this.AccountService.premiumRenew(
                req.account,
                days
            );

            res.status(200).json({ account });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updatePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { new_password, password } = req.body;
            const _id = req.account._id;
            const account = await this.AccountService.updatePassword(
                _id,
                new_password,
                password
            );

            res.status(200).json({ account });
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
            const account = await this.AccountService.delete(
                _id ? _id : account_id
            );

            res.status(200).json({ account });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAccount = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.account) {
            return next(new HttpException(404, 'No logged in account'));
        }

        res.status(200).send({ account: req.account });
    };
}

export default AccountController;
