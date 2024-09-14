import Iperson from "../interfaces/Ipersons";
import Person from "../models/Person";
import { log } from "console";
import { PersonType } from "../types/types";

class PersonService {
  private person: typeof Person;

  constructor() {
    this.person = Person;
  }

  // use .lean() para devolver objetos js simples
  public async getAll(): Promise<PersonType[] | boolean> {
    try {
      const persons = await this.person.find().lean();
      if (!persons || persons.length === 0) {
        return false;
      }
      // Conviertes primero a unknown y luego a PersonType[]
      /* 
      "Sé que el objeto devuelto por Mongoose tiene más información de la que necesito, pero confío en que es compatible con mi tipo PersonType." 
      */
      return persons as unknown as PersonType[];
    } catch (error) {
      log(error);
      return false;
    }
  }

  public async login(username: string, pass: string) {
    try {
      const person = await this.person.findOne({ username, pass }).lean();
      if (!person) {
        return false;
      }
      return person as unknown as PersonType;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async getOne(id: string) {
    try {
      const person = await this.person.findById(id).lean();
      if (!person) {
        return false;
      }
      return person as unknown as PersonType;
    } catch (error) {
      log(error);
      return false;
    }
  }

  public async create(person: Iperson) {
    try {
      const newPerson = new this.person(person);
      if (!newPerson) {
        return false;
      }
      await newPerson.save();
      return newPerson;
    } catch (error) {
      log(error);
      return false;
    }
  }

  public async update(id: string, person: Partial<Iperson>) {
    try {
      const updatedPerson = await this.person
        .findByIdAndUpdate(id, person, { new: true })
        .lean();
      if (!updatedPerson) {
        return false;
      }
      return updatedPerson as unknown as PersonType;
    } catch (error) {
      log(error);
      return false;
    }
  }

  public async delete(id: string) {
    try {
      const deletedPerson = await this.person.findByIdAndDelete(id).lean();
      if (!deletedPerson) {
        return false;
      }
      return deletedPerson as unknown as PersonType;
    } catch (error) {
      log(error);
      return false;
    }
  }
}

export default PersonService;
