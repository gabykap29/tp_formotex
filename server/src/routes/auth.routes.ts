import AuthCrtl from "../controllers/auth.controllers";
import { Router } from "express";

const router = Router();
const authCrtl = new AuthCrtl();


router.post("/login", authCrtl.login.bind(authCrtl));
router.post("/register", authCrtl.register.bind(authCrtl));

export default router;