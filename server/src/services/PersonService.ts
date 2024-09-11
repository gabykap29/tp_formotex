import Person from "../models/Person";

class PersonService {
  private person: typeof Person;
  constructor() {
    this.person = Person;
  }
  private async getAll(): Promise<any> {
    try {
      const persons = await this.person.find();
      if (!persons) {
        return [];
      }
      return persons;
    } catch (error) {}
  }
  private async getOne(id: string) {
    return await this.person.findById(id);
  }
  private async create(person: any) {
    return await this.person.create(person);
  }
  private async update(id: string, person: any) {
    return await this.person.findByIdAndUpdate(id, person);
  }
  private async delete(id: string) {
    return await this.person.findByIdAndDelete(id);
  }
}

export default PersonService;
