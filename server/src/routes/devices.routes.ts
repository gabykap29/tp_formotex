import DeviceCtrl from "../controllers/device.controllers";
import { Router } from "express";

const router = Router();
const deviceCtrl = new DeviceCtrl();
//agregar dispositivo
router.post("/devices", deviceCtrl.createDevice.bind(deviceCtrl));
//obtener dispositivos
router.get("/devices", deviceCtrl.getDevices.bind(deviceCtrl));
//obtener dispositivo por id
router.get("/devices/:id", deviceCtrl.getDevice.bind(deviceCtrl));
//actualizar dispositivo
router.put("/devices/:id", deviceCtrl.updateDevice.bind(deviceCtrl));

export default router;