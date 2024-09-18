import Repair from "../models/Repairs";
import { log } from "console";
import { Irepairs } from "../interfaces/Irepairs";
import Person from "../models/Person";
import PersonService from "./PersonService";
import DeviceService from "./Devices";
import { decodeToken } from "../helpers/jwt";

import { Idevice } from "../interfaces/Idevice";

interface token {
  id: string;
  role: string;
}

class RepairService {
  private personService: PersonService;
  private deviceService: DeviceService;
  constructor() {
    this.personService = new PersonService();
    this.deviceService = new DeviceService();
  }
  public async newRepair(
    clientId: string,
    deviceId: string,
    token: string,
  ): Promise<Irepairs | boolean> {
    try {
      const client = await this.personService.getOne(clientId);
      if (!client) {
        log("Client not found");
        return false;
      }
      const device: Idevice = (await this.deviceService.getDevice(
        deviceId,
      )) as Idevice;
      if (!device) {
        log("Device not found");
        return false;
      }
      const user = decodeToken(token) as token;

      const repair = {
        client: client._id,
        device: device._id,
        status: "en proceso",
        description: device.observations || "",
        const: 0,
        date: new Date(),
        technician: user.id || "",
      };
      const newRepair = await Repair.create(repair);
      if (!newRepair) {
        return false;
      }

      return newRepair as unknown as Irepairs;
    } catch (error) {
      log(error);
      return false;
    }
  }
  public async getAll(): Promise<Irepairs[] | boolean> {
    try {
      const repairs = await Repair.find().populate([
        "client",
        "device",
      ]).lean();
      if (!repairs || repairs.length === 0) {
        return false;
      }
      return repairs as unknown as Irepairs[];
    } catch (error) {
      log(error);
      return false;
    }
  }
  public async getOneByClient(
    identityCardNumber: string,
  ): Promise<Irepairs[] | boolean> {
    try {
      const person = await Person.findOne({ identityCardNumber }).lean();
      if (!person) {
        return false;
      }
      const repairs = await Repair.find({ client: person._id }).lean();
      if (!repairs || repairs.length === 0) {
        return false;
      }
      return repairs as unknown as Irepairs[];
    } catch (error) {
      log(error);
      return false;
    }
  }
  public async updateStateRepair(
    id: string,
    state: string,
  ): Promise<Irepairs | boolean> {
    try {
      const repair = await Repair.findByIdAndUpdate(
        id,
        { status: state },
        { new: true },
      ).lean();
      if (!repair) {
        return false;
      }
      return repair as unknown as Irepairs;
    } catch (error) {
      log(error);
      return false;
    }
  }

  public async getOneByDevice(id: string) {
    try {
      console.log("id", id);
      const repair = await Repair.findOne({ device: id })
        .populate("device")
        .populate("client")
        .populate("technician");

      if (!repair) {
        return false; // Si no se encuentra ninguna reparación, devolver false
      }
      console.log(repair)
      return repair; // Devuelve la reparación si existe
    } catch (error) {
      console.log(error);
      return false; // En caso de error, devuelve false
    }
  }

}

export default RepairService;
