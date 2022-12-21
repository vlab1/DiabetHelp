import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import AccountController from '@/resources/account/account.controller';
import RecordController from '@/resources/record/record.controller';
import MenuController from '@/resources/menu/menu.controller';
import FoodController from '@/resources/food/food.controller';
import AccountFoodController from '@/resources/account_food/account_food.controller';
import FoodMenuController from '@/resources/food_menu/food_menu.controller';

validateEnv();

const app = new App(
    [
        new AccountController(),
        new RecordController(),
        new MenuController(),
        new FoodController(),
        new AccountFoodController(),
        new FoodMenuController()
    ],
    Number(process.env.PORT)
);

app.listen();
