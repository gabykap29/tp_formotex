import Iperson from "../interfaces/Ipersons";
import Person from "../models/Person";
import { log } from "console";
import { PersonType } from "../types/types";
import bcrypt from "bcrypt";
import PersonCtrl from "../controllers/person.controllers";
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
  public async getUsers() {
    try {
      // Obtén los usuarios que tienen un campo `username` definido y no vacío
      const users = await Person.find({
        username: { $exists: true, $ne: "" }
      });
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw new Error("No se pudieron obtener los usuarios");
    }
  }

  public async login(username: string, pass: string) {
    try {
      console.log(username);
      const person = await this.person.findOne({ username: username }).lean();
      log(person);
      console.log("pass", pass)
      if (!person) {
        return false;
      }
      if (!person.pass) {
        return false;
      }
      const validPass = bcrypt.compareSync(pass, person.pass);
      if (!validPass) {
        return false;
      }
      return person as unknown as PersonType;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  public async getClients() {
    try {
      const clients = await Person.find({ typePerson: "client" });
      if (!clients) {
        return false;
      }
      return clients;
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
      log(newPerson)
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
  public async createUserDefault() {
    const cantPerson = await this.person.countDocuments();
    const passHash = bcrypt.hashSync("admin", 10);
    if (cantPerson === 0) {
      this.person.create({
        names: "Admin",
        lastname: "Admin",
        username: "admin",
        pass: passHash,
        role: "admin",
      });

      log("Usuario por defecto creado");
    } else {
      log("Usuario por defecto ya existe");
    }
  }
}

export default PersonService;
