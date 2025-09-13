import { Router } from "express";
import { verifyJWTHospital } from "../middlewares/auth.middleware.js";
import { createBloodRequest, findMatchingDonors } from "../controllers/request.controller.js";

const router = Router();

router.post("/", verifyJWTHospital, createBloodRequest);
router.post("/donors", verifyJWTHospital, findMatchingDonors);

export default router;
