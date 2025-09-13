import Router from "express";

import { registerHospital, loginHospital, logOutHospital } from "../controllers/hospital.controller.js";
import { verifyJWTHospital } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerHospital);
router.route("/login").post(loginHospital);
router.route("/logout").post(verifyJWTHospital, logOutHospital);
export default router;
