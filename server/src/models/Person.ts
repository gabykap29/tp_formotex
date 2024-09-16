import { Schema, model } from "mongoose";

const PersonSchema = new Schema(
  {
    typePerson: {
      type: String,
      required: false,
    },
    names: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    identityCardNumber: {
      type: String,
      required: false,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    address: {
      street: {
        type: String,
        required: false,
      },
      number: {
        type: String,
        required: false,
      },
      neighborhood: {
        type: String,
        required: false, //hace referencia al barrio
      },
    },
    email:{
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    pass: {
      type: String,
      required: false,
    },
    role: {
      enum: ["admin", "manager","employee","technician"],
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Person = model("Person", PersonSchema);

export default Person;
