import { Types, Document } from "mongoose";

export interface Idevice extends Document {
    _id: Types.ObjectId;
    deviceType: string;
    brand: string;
    deviceModel: string;
    serialNumber?: string;
    os: string;
    clientId: Types.ObjectId;
}