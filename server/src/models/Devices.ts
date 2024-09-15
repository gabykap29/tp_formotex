import { Schema, model } from "mongoose";

const DeviceSchema = new Schema({
    deviceType:{
        type:String, //portatil, escritorio, movil, tablet
        required:true,
    },
    brand:{ //marca
        type:String,
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    serialNumber:{
        type:String,
        required:false,
    },
    os:{
        type:String,
        required:true,
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    }
},{
    timestamps:true,
});
const Device = model('Device', DeviceSchema);

export default Device;

