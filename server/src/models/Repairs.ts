import {Schema, model} from "mongoose";

const RepairSchema = new Schema({
    device:{
        type: Schema.Types.ObjectId,
        ref: 'Device',
        required: true,
    },
    status:{
        enum:['en proceso','terminado','entregado', 'cancelado'],
        type:String, //en proceso, terminado, entregado
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    cost:{
        type:Number,
        default:0,
    },
    date:{
        type:Date,
        required:true,
    },
    client:{
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    },
    technician:{
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    },
},{
    timestamps:true,
});

const Repair = model('Repair', RepairSchema);

export default Repair;