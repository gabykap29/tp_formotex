import RepairService from "../services/RepairsService";
import { log } from "console";
import { Request,Response } from "express";
class RepairCtrl{
    private repairService = new RepairService();
    constructor(){}
    async getAll(_req: Request, res: Response){
        try {
            const repairs = await this.repairService.getAll();
            if(!repairs){
                return res.status(404).json({
                    status:404,
                    message: "Aun no hay reparaciones cargadas."
                });
            }
            return res.status(200).json({status:200, data: repairs});
        } catch (error) {
            log(error);
            return res.status(500).json({
                status: 500, message: "Internal Server Error."
            });
        }
    }
    async create(req: Request, res: Response){
        try {
            const body = req.body;
            const newRepair = await this.repairService.newRepair(body);
            if(!newRepair){
                return res.status(400).json({
                status:400,
                message: "Error al intentar crear la reparación."
                });
            }
            return res.status(200).json({status:200, data: newRepair});
        } catch (error) {
            log(error);
            return res.status(500).json({
                status:500,
                message: "Internal Server Error."
            });
        }
    }
    async getOneByClient(req: Request, res: Response){
        try {
            const {identityCardNumber} = req.params;
            const repairs = await this.repairService.getOneByClient(identityCardNumber);
            if(!repairs){
                return res.status(404).json({
                    status:404,
                    message: "No se encontraron reparaciones."
                });
            }
            return res.status(200).json({status:200, data: repairs});
        } catch (error) {
            log(error);
            return res.status(500).json({
                status:500,
                message: "Internal Server Error."
            });
        }
    }
    async updateStateRepair(req: Request, res: Response){
        try {
            const {id,state} = req.body;
            const repair = await this.repairService.updateStateRepair(id,state);
            if(!repair){
                return res.status(400).json({
                    status:400,
                    message: "Error al intentar actualizar la reparación."
                });
            }
            return res.status(200).json({status:200, data: repair});
        } catch (error) {
            log(error);
            return res.status(500).json({
                status:500,
                message: "Internal Server Error."
            });
        }
    }
}

export default RepairCtrl;