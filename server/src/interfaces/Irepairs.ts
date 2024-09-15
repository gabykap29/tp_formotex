import {Types, Document} from 'mongoose';

export interface Irepairs extends Document{
    _id: Types.ObjectId;
    date: Date;
    description: string;
    cost: number;
    carId: string;
    status: string;
    userId: Types.ObjectId;
}