import Repair from "../models/Repairs";
import { log } from "console";
import { Irepairs } from "../interfaces/Irepairs";
import Person from "../models/Person";


class RepairService{
    constructor(){
    }
    public async newRepair(repair: Irepairs): Promise<Irepairs | boolean> {
        try {
            const newRepair = await Repair.create(repair);
            if (!newRepair) {
                return false;
            }
            /* 
            "sé que el objeto devuelto por Mongoose tiene más información de la que necesito, pero confío en que es compatible con el tipo Irepairs." 
            */
            return newRepair as unknown as Irepairs;
        } catch (error) {
            log(error);
            return false;
        }
    } 
    public async getAll(): Promise<Irepairs[] | boolean> {
        try {
            const repairs = await Repair.find().lean();
            if (!repairs || repairs.length === 0) {
                return false;
            }
            return repairs as unknown as Irepairs[];
        } catch (error) {
            log(error);
            return false;
        }
    }
    public async getOneByClient(identityCardNumber: string): Promise<Irepairs[] | boolean> {
        try {
            const person = await Person.findOne({identityCardNumber}).lean();
            if (!person) {
                return false;
            }
            const repairs = await Repair.find({client: person._id}).lean();
            if (!repairs || repairs.length === 0) {
                return false;
            }
            return repairs as unknown as Irepairs[];
        } catch (error) {
            log(error);
            return false;
        }
    }
    public async updateStateRepair(id: string, state: string): Promise<Irepairs | boolean> {
        try {
            const repair = await Repair.findByIdAndUpdate(id, {status: state}, {new: true}).lean();
            if (!repair) {
                return false;
            }
            return repair as unknown as Irepairs;
        } catch (error) {
            log(error);
            return false;
        }
    }
}

export default RepairService;