import DeviceCtrl from "../controllers/device.controllers";
import { Router } from "express";

const router = Router();
const deviceCtrl = new DeviceCtrl();

router.post("/devices", deviceCtrl.createDevice);
router.get("/devices", deviceCtrl.getDevices);
router.get("/devices/:id", deviceCtrl.getDevice);
router.put("/devices/:id", deviceCtrl.updateDevice);

export default router;