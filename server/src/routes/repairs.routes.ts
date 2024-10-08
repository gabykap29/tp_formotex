import RepairCtrl from "../controllers/repairs.controllers";
import { Router } from "express";

const router = Router();
const repairCtrl = new RepairCtrl();

router.get("/repairs", repairCtrl.getAll.bind(repairCtrl));
router.post("/repairs", repairCtrl.create.bind(repairCtrl));
router.get("/repairs/:identityCardNumber", repairCtrl.getOneByClient.bind(repairCtrl));
router.put("/repair/state/:id", repairCtrl.updateStateRepair.bind(repairCtrl));
router.get("/repairs/getByDevice/:id", repairCtrl.getByDevice.bind(repairCtrl));

export default router;
