import PersonCtrl from "../controllers/person.controllers";
import { Router } from "express";

const router = Router();
const personCtrl = new PersonCtrl();

router.get("/persons", personCtrl.getAll.bind(personCtrl));
router.post("/persons", personCtrl.create.bind(personCtrl));
router.put("/persons/:id", personCtrl.updatePerson.bind(personCtrl));

export default router;