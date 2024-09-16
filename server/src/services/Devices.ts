import Device from "../models/Devices";
import { Idevice } from "../interfaces/Idevice";
import { log } from 'console';
class DeviceService {
    constructor(){}
    public async createDevice(device:Idevice):Promise<boolean| Idevice > {
        try {
            const newDevice = await Device.create(device);
            return newDevice as unknown as Idevice;
        } catch (error) {
            log(error);
            return false;
        }
    }
    public async getDevices(){
        try {
            const devices = await Device.find();
            return devices;
        } catch (error) {
            log(error);
            return false;
        }
    }
    public async getDevice(id:string):Promise<boolean | Idevice>{
        try {
            const device = await Device.findById(id);
            return device as unknown as Idevice;
        } catch (error) {
            log(error);
            return false;
        }
    }
    public async updateDevice(id:string, device:Idevice):Promise<boolean | Idevice>{
        try {
            const updatedDevice = await Device.findByIdAndUpdate(id, device, {new:true});
            return updatedDevice as unknown as Idevice;
        } catch (error) {
            log(error);
            return false;
        }
    }
}

export default DeviceService;