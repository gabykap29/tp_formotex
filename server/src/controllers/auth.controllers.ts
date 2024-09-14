import Person from "../models/Person";
import { Request, Response } from "express";
class AuthCrtl {
  private personService = new Person();
  constructor() {}
  async login(req: Request, res: Response) {
    try {
      const {username, pass} = req.body;
      
    } catch (error) {
      
    }
  }
}
