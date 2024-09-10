import { Schema, model } from "mongoose";

const PersonSchema = new Schema({
    typePerson:{
        type: String,
        required: true,
    },
    names: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    identityCardNumber:{
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    address: {
        street: {
            type: String, required: false,
        },
        number: {
            type: String, required: false,
        },
        neighborhood:{
            type: String, required: false //hace referencia al barrio        
        }
    },
    username: {
        type: String,
        required: false,
    },
    pass: {
        type: String,
        required: true,
    }

},{
    timestamps : true
});

const Person = model('Person', PersonSchema);

export default Person;

