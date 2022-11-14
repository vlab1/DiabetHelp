import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/calculator/calculator.validation';
import CalculatorService from '@/resources/calculator/calculator.service';
import authenticated from '@/middleware/authenticated.middleware';

class CalculatorController implements Controller {
    public path = '/calculator';
    public router = Router();
    private CalculatorService = new CalculatorService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}`,
            validationMiddleware(validate.get),
            authenticated,
            this.get
        );
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {menu_id} = req.body;

            const calculator = await this.CalculatorService.get(menu_id);

            res.status(200).json({ calculator });
        } catch (error) {
            next(new HttpException(400, 'Cannot calculate the food on the menu'));
        }
    };
}

export default CalculatorController;
