import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Account from '@/resources/account/account.interface';
import MenuModel from '../menu/menu.model';
import AccountFoodModel from '../account_food/account_food.model';
import RecordModel from '../record/record.model';

const AccountSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
        passwordGoogle: {
            type: String,
            trim: true,
        },
        birth_date: {
            type: Date,
            trim: true,
        },
        sex: {
            type: String,
            trim: true,
        },
        diabetes_type: {
            type: Number,
        },
        localization: {
            type: String,
            trim: true,
        },
        // isPremium: {
        //     type: Boolean,
        //     default: false
        // },
        high_sugar: {
            type: Number,
        },
        low_sugar: {
            type: Number,
        },
        premiumExpires: {
            type: Date,
        },
    },
    { timestamps: true }
);

AccountSchema.pre<Account>('save', async function (next) {
    if (!this.isModified('password') && !this.isModified('passwordGoogle')) {
        return next();
    }
    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    if (this.passwordGoogle) {
        const hash = await bcrypt.hash(this.passwordGoogle, 10);
        this.passwordGoogle = hash;
    }
    next();
});

AccountSchema.pre<Account>('findOneAndUpdate', async function (this) {
    const update: any = { ...this.getUpdate() };
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
        this.setUpdate(update);
    }
    if (update.passwordGoogle) {
        update.passwordGoogle = await bcrypt.hash(update.passwordGoogle, 10);
        this.setUpdate(update);
    }
});

AccountSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

AccountSchema.methods.isValidPasswordGoogle = async function (
    passwordGoogle: string
): Promise<Error | boolean> {
    return await bcrypt.compare(
        passwordGoogle,
        this.passwordGoogle ? this.passwordGoogle : ''
    );
};

AccountSchema.methods.isValidPremium = async function (): Promise<
    Error | boolean
> {
    return new Date(Date.now()) < this.premiumExpires;
};

AccountSchema.post('findOneAndDelete', async function (result, next) {
    await MenuModel.deleteMany({ account_id: result._id });
    await AccountFoodModel.deleteMany({ account_id: result._id });
    await RecordModel.deleteMany({ account_id: result._id });
    next();
});

// AccountSchema.pre(
//     'deleteMany',
//     { document: false, query: true },
//     async function (next) {
//         const docs = await this.model.find(this.getFilter());
//         const accounts = docs.map((item) => item._id);
//         await RecordModel.deleteMany({ account: { $in: accounts } });
//         next();
//     }
// );

// AccountSchema.post<Account>(/^find/, async function (account, next) {
//     account.isPremium = (new Date(Date.now()) < account.premiumExpires);
//     next();
// });

// AccountSchema.pre<Account>(/^find/, async function (next) {
//     const query: any = this.getQuery();
//     if (!query._id) {
//         next();
//     }
//     next();
// });

// AccountSchema.post<Account>(/^find/, async function (result, next) {
//     console.log(123)
//     next();
// });

// AccountSchema.pre<Account>(/.*/, async function (next) {
//     console.log(123);
//     next();
// });

// AccountSchema.pre<Account>(/.*/, async function (next) {
//     console.log(123);
//     next();
// });

export default model<Account>('Accounts', AccountSchema);
