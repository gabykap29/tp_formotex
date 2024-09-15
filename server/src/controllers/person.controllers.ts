import PersonService from "../services/PersonService";
import Iperson from "../interfaces/Ipersons";
import { log } from "console";
import {Request, Response} from "express";

class PersonCtrl{
    private personService = new PersonService();
    constructor(){}
    async getAll(_req: Request, res: Response){
        try {
            const persons = await this.personService.getAll();
            if (!persons) {
                return res.status(400).json({message: "No se encontraron personas"});
            }
            return res.status(200).json({status: 200, data: persons});
        } catch (error) {
            log(error);
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
    async create(req:Request , res: Response){
        try {
            const person: Iperson = req.body;
            const newPerson = await this.personService.create(person);
            if (!newPerson) {
                return res.status(400).json({status:400,message: "Persona no creada"});
            }
            return res.status(200).json({status: 200, data: newPerson});
        } catch (error) {
            log(error);
            return res.status(500).json({status:500,message: "Internal Server Error"});
        }
    }
    async updatePerson(req: Request, res: Response){
        try {
            const id = req.params;
            const person = req.body;
            const updatePerson = this.personService.update(id.toString(),person);
            if(!updatePerson){
                return res.status(400).json({
                    status:400, message: "Error al intentar actualizar la persona, verifique los campos!"
                });
            } 
            return res.status(200).json({status:200, message: "se actualizó correctamente!"})
        } catch (error) {
            log(error);
            return res.status(500).json({status:500, message: "Internal Error Server."})
        }
    }
}

export default PersonCtrl;