import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/account/account.validation';
import AccountService from '@/resources/account/account.service';
import authenticated from '@/middleware/authenticated.middleware';
import permission from '@/middleware/admin.permission.middleware';
import Props from '@/utils/types/props.type';
import Account from '@/resources/account/account.interface';

class AccountController implements Controller {
    public path = '/account';
    public router = Router();
    private AccountService = new AccountService();
    private client_url = process.env.CLIENT_URL;

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
            `${this.path}/payment`,
            validationMiddleware(validate.payment),
            authenticated,
            this.payment
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
        this.router.delete(`${this.path}/delete`, authenticated, this.delete);
        this.router.get(`${this.path}`, authenticated, this.getAccount);

        this.router.get(
            `${this.path}/premium/status`,
            authenticated,
            this.getPremiumStatus
        );

        this.router.delete(
            `${this.path}/admin/delete`,
            validationMiddleware(validate.adminDelete),
            authenticated,
            permission,
            this.adminDelete
        );

        this.router.get(
            `${this.path}/admin/get`,
            validationMiddleware(validate.adminGet),
            authenticated,
            permission,
            this.adminGet
        );
        this.router.get(
            `${this.path}/admin/find`,
            validationMiddleware(validate.adminFind),
            authenticated,
            permission,
            this.adminFind
        );
        this.router.put(
            `${this.path}/admin/update/role`,
            validationMiddleware(validate.adminUpdateRole),
            authenticated,
            permission,
            this.adminUpdateRole
        );
        this.router.post(
            `${this.path}/admin/create`,
            validationMiddleware(validate.adminCreate),
            authenticated,
            permission,
            this.adminCreate
        );
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

            res.status(201).json({ data: token });
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

            res.status(200).json({ data: token });
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
            res.status(200).json({ data: token });
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
                name,
                email,
                password,
                passwordGoogle,
                birth_date,
                sex,
                diabetes_type,
                // localization,
                high_sugar,
                phone,
                low_sugar,
                premiumExpires,
            } = req.body;

            const account_id = req.account._id;

            const account = await this.AccountService.update(
                account_id,
                name,
                email,
                password,
                passwordGoogle,
                birth_date,
                sex,
                diabetes_type,
                // localization,
                high_sugar,
                low_sugar,
                premiumExpires,
                phone
            );

            res.status(200).json({ data: account });
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
            const { days, key } = req.body;

            const account = (await this.AccountService.premiumRenew(
                req.account,
                days,
                key
            )) as Account;

            res.status(200).json({ data: account });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private payment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { days, price, name, key } = req.body;

            const url = await this.AccountService.payment(
                req.account,
                days,
                price,
                this.client_url as string,
                name,
                key
            );

            res.status(200).json({ data: url });
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

            res.status(200).json({ data: account });
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
            const account_id = req.account._id;
            const account = await this.AccountService.delete(account_id);

            res.status(200).json({ data: account });
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

        res.status(200).send({ data: req.account });
    };

    private getPremiumStatus = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            if (!req.account) {
                return next(new HttpException(404, 'No logged in account'));
            }
            const isPremium = await req.account.isValidPremium();
            res.status(200).send({ data: isPremium });
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
            const account = await this.AccountService.adminDelete(_id);

            res.status(200).json({ data: account });
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

            const accounts = (await this.AccountService.adminGet(
                props
            )) as Array<Account>;

            res.status(200).json({ data: accounts });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private adminFind = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const props = req.body as Props;
            const accounts = await this.AccountService.adminFind(props);

            res.status(200).json({ data: accounts });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private adminUpdateRole = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id, role } = req.body;

            const account = await this.AccountService.adminUpdateRole(
                _id,
                role
            );

            res.status(200).json({ data: account });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private adminCreate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                name,
                email,
                password,
                birth_date,
                sex,
                diabetes_type,
                // localization,
                high_sugar,
                phone,
                low_sugar,
                premiumExpires,
            } = req.body;

            const token = await this.AccountService.adminCreate(
                email,
                password,
                name,
                birth_date,
                sex,
                diabetes_type,
                // localization,
                high_sugar,
                phone,
                low_sugar,
                premiumExpires
            );

            res.status(201).json({ data: token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default AccountController;
