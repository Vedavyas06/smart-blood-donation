import Router from "express";

import { registerDonor, loginDonor, logOutDonor } from "../controllers/donor.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerDonor);
router.route("/login").post(loginDonor);
router.route("/logout").post(verifyJWT, logOutDonor);
export default router;
