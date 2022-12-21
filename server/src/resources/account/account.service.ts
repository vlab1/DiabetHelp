import AccountModel from '@/resources/account/account.model';
import token from '@/utils/token';
import Account from '@/resources/account/account.interface';
import { Schema } from 'mongoose';
import Props from '@/utils/types/props.type';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class AccountService {
    private account = AccountModel;

    /**
     * Register a new account
     */

    private randGen() {
        const abc: string =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let random: string = '';
        while (random.length < 100) {
            random += abc[Math.floor(Math.random() * abc.length)];
        }
        return random;
    }

    public async register(
        email: string,
        password: string,
        name: string
    ): Promise<string | Error> {
        try {
            const accountExists = await this.account.findOne({ email });
            if (accountExists) {
                throw new Error('Account already exists');
            }
            const account = await this.account.create({
                email,
                password,
                name,
            });

            const accesToken = token.createToken(account);

            return accesToken;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to login a account
     */

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const account = await this.account.findOne({ email });
            if (!account) {
                throw new Error('Unable to find account with that data');
            }
            //
            await this.account
                .findOneAndUpdate(
                    { email: email },
                    {
                        allPaymentKeys: [],
                    },
                    { new: true }
                )
                .exec();
                //
            if (await account.isValidPassword(password)) {
                const accesToken = token.createToken(account);
                return accesToken;
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to login a google account
     */
    public async googleLogin(
        email: string,
        passwordGoogle: string,
        name: string
    ): Promise<string | Error> {
        try {
            let account = await this.account.findOne({ email });
            if (!account) {
                account = await this.account.create({
                    email,
                    passwordGoogle,
                    name,
                });
            }
            if (await account.isValidPasswordGoogle(passwordGoogle)) {
                const accesToken = token.createToken(account);
                return accesToken;
            } else {
                await this.account.findOneAndUpdate(
                    { _id: account._id },
                    { passwordGoogle }
                );
                const accesToken = token.createToken(account);
                return accesToken;
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to update account
     */

    public async update(
        _id: Schema.Types.ObjectId,
        name: string,
        email: string,
        password: string,
        passwordGoogle: string,
        birth_date: Date,
        sex: string,
        diabetes_type: number,
        // localization: string,
        high_sugar: number,
        low_sugar: number,
        premiumPeriod: number,
        phone: string
    ): Promise<Account | Error> {
        try {
            const account = await this.account
                .findByIdAndUpdate(
                    _id,
                    {
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
                        premiumPeriod,
                        phone,
                    },
                    { new: true }
                )
                .select(['-password', '-passwordGoogle'])
                .exec();

            if (!account) {
                throw new Error('Unable to update account with that data');
            }

            return account;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to premium renew
     */

    public async premiumRenew(
        account: Account,
        days: number,
        key: string
    ): Promise<Account | Error> {
        try {
            const current_account = await this.account.findOne({
                _id: account._id,
            });

            if (!current_account) {
                throw new Error('Unable to find this account');
            }

            const paymentKeys = current_account.paymentKeys;
            const allPaymentKeys = current_account.allPaymentKeys;

            if (paymentKeys.includes(key) || !allPaymentKeys.includes(key)) {
                throw new Error('Unable to renew premium');
            } else {
                await this.account.findOneAndUpdate(
                    { _id: account._id },
                    { $push: { paymentKeys: key } }
                );
            }

            let newPremiumExpires = new Date();
            if (account.premiumExpires) {
                if (new Date(Date.now()) < account.premiumExpires) {
                    newPremiumExpires = account.premiumExpires;
                } else {
                    newPremiumExpires = new Date(Date.now());
                }
            }
            newPremiumExpires.setDate(newPremiumExpires.getDate() + days);

            const acc = await this.account
                .findByIdAndUpdate(
                    account._id,
                    { $set: { premiumExpires: newPremiumExpires } },
                    { new: true }
                )
                .select(['-password', '-passwordGoogle'])
                .exec();

            if (!acc) {
                throw new Error('Unable to premium renew with that data');
            }
            return acc;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to premium renew
     */

    public async payment(
        account: Account,
        days: number,
        price: number,
        my_domain: string,
        name: string,
        key: string
    ): Promise<string | Error> {
        try {
            await this.account.findOneAndUpdate(
                { _id: account._id },
                { $push: { allPaymentKeys: key } }
            );

            const line_items = [
                {
                    price_data: {
                        currency: 'uah',
                        product_data: {
                            name: name + ' ' + days + ' ' + 'days',
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                },
            ];
            const time = new Date().getTime();

            const session = await stripe.checkout.sessions.create({
                line_items,
                mode: 'payment',
                success_url: `${my_domain}/success/${key}/${time}/${days}`,
                cancel_url: `${my_domain}/canceled`,
            });

            return session.url;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to update account password
     */
    public async updatePassword(
        _id: Schema.Types.ObjectId,
        new_password: string,
        password: string
    ): Promise<Account | Error> {
        try {
            const acc = await this.account.findOne({ _id });

            if (!acc) {
                throw new Error('Unable to find account with that data');
            }

            if (await acc.isValidPassword(password)) {
                const account = await this.account
                    .findOneAndUpdate(
                        { _id },
                        { password: new_password },
                        { new: true }
                    )
                    .select(['-password', '-passwordGoogle'])
                    .exec();

                if (!account) {
                    throw new Error('Unable to update account with that data');
                }

                return account;
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to delete account
     */

    public async delete(_id: Schema.Types.ObjectId): Promise<Account | Error> {
        try {
            const account = await this.account
                .findByIdAndDelete(_id)
                .select(['-password', '-passwordGoogle'])
                .exec();

            if (!account) {
                throw new Error('Unable to delete account with that data');
            }

            return account;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to delete one account
     */
    public async adminDelete(
        _id: Schema.Types.ObjectId
    ): Promise<Account | Error> {
        try {
            const account = await this.account
                .findByIdAndDelete(_id)
                .select(['-password', '-passwordGoogle'])
                .exec();

            if (!account) {
                throw new Error('Unable to delete account with that data');
            }

            return account;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to get accounts
     */
    public async adminGet(
        props: Props
    ): Promise<Account | Array<Account> | Error> {
        try {
            if (props.email) {
                props.email = {
                    $regex: new RegExp(props.email),
                    $options: 'i',
                };
            }

            const accounts = await this.account
                .find(props)
                .select(['-password', '-passwordGoogle'])
                .exec();

            if (!accounts) {
                throw new Error('Unable to find accounts');
            }

            return accounts;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to find accounts
     */
    public async adminFind(
        props: Props
    ): Promise<Account | Array<Account> | Error> {
        try {
            const accounts = await this.account
                .find(props)
                .select(['-password', '-passwordGoogle'])
                .exec();

            if (!accounts) {
                throw new Error('Unable to find accounts');
            }

            return accounts;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to update role
     */
    public async adminUpdateRole(
        _id: Schema.Types.ObjectId,
        role: string
    ): Promise<Account | Error> {
        try {
            const account = await this.account
                .findByIdAndUpdate(
                    _id,
                    {
                        role: role,
                    },
                    { new: true }
                )
                .select(['-password', '-passwordGoogle'])
                .exec();

            if (!account) {
                throw new Error('Unable to update account with that data');
            }

            return account;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Create a new account
     */
    public async adminCreate(
        email: string,
        password: string,
        name: string,
        birth_date: Date,
        sex: string,
        diabetes_type: number,
        // localization: string,
        high_sugar: number,
        phone: string,
        low_sugar: number,
        premiumExpires: Date
    ): Promise<string | Error> {
        try {
            const accountExists = await this.account.findOne({ email });
            if (accountExists) {
                throw new Error('Account already exists');
            }
            const account = await this.account.create({
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
            });

            const accesToken = token.createToken(account);

            return accesToken;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default AccountService;
