import { Document, Types } from 'mongoose';
interface Iperson extends Document {
  _id: Types.ObjectId;
  typePerson: string;
  names: string;
  lastname: string;
  identityCardNumber: string;
  birthDate: Date;
  address: {
    street: string;
    number: string;
    neighborhood: string;
  };
  username?: string;
  pass?: string;
  role?: string;
}

export default Iperson;
