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
  private async getAll(): Promise<PersonType[] | boolean> {
    try {
      const persons = await this.person.find().lean();
      if (!persons || persons.length === 0) {
        return false;
      }
      return persons as PersonType[];
    } catch (error) {
      log(error);
      return false;
    }
  }

  private async getOne(id: string) {
    try {
      const person = await this.person.findById(id).lean();
      if (!person) {
        return false;
      }
      return person as PersonType;
    } catch (error) {
      log(error);
      return false;
    }
  }

  private async create(person: Iperson) {
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

  private async update(id: string, person: Partial<Iperson>) {
    try {
      const updatedPerson = await this.person
        .findByIdAndUpdate(id, person, { new: true })
        .lean();
      if (!updatedPerson) {
        return false;
      }
      return updatedPerson as PersonType;
    } catch (error) {
      log(error);
      return false;
    }
  }

  private async delete(id: string) {
    try {
      const deletedPerson = await this.person.findByIdAndDelete(id).lean();
      if (!deletedPerson) {
        return false;
      }
      return deletedPerson as PersonType;
    } catch (error) {
      log(error);
      return false;
    }
  }
}

export default PersonService;
