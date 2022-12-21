import { Document } from 'mongoose';

export default interface Account extends Document {
    name: string;
    email: string;
    password: string;
    passwordGoogle: string;
    birth_date: Date;
    sex: string;
    diabetes_type: number;
    // localization: string;
    high_sugar: number;
    low_sugar: number;
    premiumExpires: Date;
    role: string;
    phone: string;
    paymentKeys: Array<string>;
    allPaymentKeys: Array<string>;
    
    getUpdate(): Promise<Error | Object>;
    setUpdate(obj: Object): Promise<Error | boolean>;
    getQuery(): Promise<Error | Object>;
    isValidPassword(passwod: string): Promise<Error | boolean>;
    isValidPasswordGoogle(passwod: string): Promise<Error | boolean>;
    isValidPremium(): Promise<Error | boolean>;
}
