interface Iperson {
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
