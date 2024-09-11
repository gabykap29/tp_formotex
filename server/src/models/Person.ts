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
    username: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  },
);

const Person = model("Person", PersonSchema);

export default Person;
