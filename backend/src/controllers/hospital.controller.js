import {ApiResponse} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Hospital } from "../models/hospital.model.js";
import { ApiError } from "../utils/ApiError.js";

export const registerHospital = asyncHandler(async (req, res) => {
    const { name, email, location, contactNumber ,password, licenseNumber} = req.body;
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
        throw new ApiError(409, "Hospital with this email already exists");
    }
    const hospital = await Hospital.create({ name, email, location, contactNumber ,password, licenseNumber});
    res.status(201).json(new ApiResponse(201, "Hospital registered successfully", { hospital }));
});

export const loginHospital = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const hospital = await Hospital.findOne({ email });
    if (!hospital || !(await hospital.comparePassword(password))) {
        throw new ApiError(401, "Invalid email or password");
    }  
    const token = hospital.generateAuthToken();
    hospital.token=token;
    await hospital.save();
    const options={
        httpOnly:true,
        secure:false,
        sameSite: "lax"

    }
    res.status(200).cookie("hospitalToken", token, options).json(new ApiResponse(200, "Hospital logged in successfully", { hospital,token }));
});

export const logOutHospital = asyncHandler(async (req, res) => {
    const hospital = req.hospital;
    hospital.token = null;
    await hospital.save();
    const options={
        httpOnly:true,
        secure:false,
        sameSite: "lax"
    }
    res.status(200).clearCookie("hospitalToken",options).json(new ApiResponse(200, "Hospital logged out successfully"));
});

