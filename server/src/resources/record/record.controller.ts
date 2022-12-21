import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/record/record.validation';
import RecordService from '@/resources/record/record.service';
import authenticated from '@/middleware/authenticated.middleware';
import Props from '@/utils/types/props.type';
import permission from '@/middleware/admin.permission.middleware';

class RecordController implements Controller {
    public path = '/record';
    public router = Router();
    private RecordService = new RecordService();

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
            `${this.path}/statistics`,
            authenticated,
            this.statistics
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
            const { glucose, comment, date, weight } = req.body;

            const account_id = req.account._id;

            const record = await this.RecordService.create(
                glucose,
                comment,
                date,
                account_id,
                weight
            );

            res.status(201).json({ data: record });
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
            const { _id, glucose, comment, date, weight } = req.body;

            const account_id = req.account._id;

            const record = await this.RecordService.update(
                _id,
                glucose,
                comment,
                date,
                account_id,
                weight
            );

            res.status(200).json({ data: record });
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

            const record = await this.RecordService.delete(_id, account_id);

            res.status(200).json({ data: record });
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

            const records = await this.RecordService.get(account_id);

            res.status(200).json({ data: records });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    
    private statistics = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const account_id = req.account._id;

            const records = await this.RecordService.statistics(account_id);

            res.status(200).json({ data: records });
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
            const records = await this.RecordService.find(props, account_id);

            res.status(200).json({ data: records });
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
            const records = await this.RecordService.adminGet(props);

            res.status(200).json({ data: records });
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
            const record = await this.RecordService.adminDelete(_id);

            res.status(200).json({ data: record });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default RecordController;
