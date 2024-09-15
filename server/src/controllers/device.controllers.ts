import DeviceService from "../services/Devices";
import { Request, Response } from "express";    
import { Idevice } from "../interfaces/Idevice";

class DeviceCtrl{
    private deviceService:DeviceService = new DeviceService();
    constructor(){}
    public async createDevice(req:Request, res:Response){
        const device:Idevice = req.body;
        const newDevice = await this.deviceService.createDevice(device);
        if(newDevice){
            res.status(200).json({message:"Device created successfully", data:newDevice});
        }else{
            res.status(500).json({message:"Error creating device"});
        }
    }
    public async getDevices(req:Request, res:Response){
        const devices = await this.deviceService.getDevices();
        if(devices){
            res.status(200).json({data:devices});
        }else{
            res.status(500).json({message:"Error getting devices"});
        }
    }
    public async getDevice(req:Request, res:Response){
        const id = req.params.id;
        const device = await this.deviceService.getDevice(id);
        if(device){
            res.status(200).json({data:device});
        }else{
            res.status(500).json({message:"Error getting device"});
        }
    }
    public async updateDevice(req:Request, res:Response){
        const id = req.params.id;
        const device:Idevice = req.body;
        const updatedDevice = await this.deviceService.updateDevice(id, device);
        if(updatedDevice){
            res.status(200).json({message:"Device updated successfully", data:updatedDevice});
        }else{
            res.status(500).json({message:"Error updating device"});
        }
    }
}

export default DeviceCtrl;