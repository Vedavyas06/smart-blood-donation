import Router from "express";

import { registerDonor, loginDonor, logOutDonor } from "../controllers/donor.controller.js";
import { verifyJWTDonor } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerDonor);
router.route("/login").post(loginDonor);
router.route("/logout").post(verifyJWTDonor, logOutDonor);
export default router;
