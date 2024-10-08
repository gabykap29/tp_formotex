import PersonService from "../services/PersonService";
import { Request, Response } from "express";
import { generateToken } from "../helpers/jwt";
class AuthCrtl {
  private personService = new PersonService();
  constructor() { }
  async login(req: Request, res: Response) {
    try {
      const { emailOrUsername, password } = req.body;

      const user = await this.personService.login(emailOrUsername, password);
      if (!user) {
        return res.status(400).json({ status: 400, message: "Credenciales inválidas!." });
      }
      const token = generateToken({ id: user._id, role: user.role });
      const dataUser = {
        names: user.names,
        lastname: user.lastname,
        role: user.role
      };
      return res.status(200).json({ status: 200, token: token, data: dataUser, message: "Iniciando sesión" });
    } catch (error) {
      error instanceof Error ? console.log(error.message) : console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async register(req: Request, res: Response) {
    try {
      const person = req.body;
      const newPerson = await this.personService.create(person);
      if (!newPerson) {
        return res.status(400).json({ message: "User not created" });
      }
      return res.status(200).json({ status: "ok", message: "User created" });
    } catch (error) {
      error instanceof Error ? console.log(error.message) : console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthCrtl;
