import {ApiResponse} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Donor } from "../models/donor.model.js";
import { ApiError } from "../utils/ApiError.js";

export const registerDonor = asyncHandler(async (req, res) => {
    const { name, email, age, bloodGroup, location, contactNumber ,password} = req.body;
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
        throw new ApiError(409, "Donor with this email already exists");
    }
    const donor = await Donor.create({ name, email, age, bloodGroup, location, contactNumber ,password});
    res.status(201).json(new ApiResponse(201, "Donor registered successfully", { donor }));
});

export const loginDonor = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const donor = await Donor.findOne({ email });
    if (!donor || !(await donor.comparePassword(password))) {
        throw new ApiError(401, "Invalid email or password");
    } 
    const token = donor.generateAuthToken();
    donor.token=token;
    await donor.save();
    const options={
        httpOnly:true,
        secure:true
    }
    res.status(200).cookie("token", token, options).json(new ApiResponse(200, "Donor logged in successfully", { donor,token }));
});

export const logOutDonor = asyncHandler(async (req, res) => {
    const donor = req.user;
    donor.token = null;
    await donor.save();
    const options={
        httpOnly:true,
        secure:true
    }
    res.status(200).clearCookie("token",options).json(new ApiResponse(200, "Donor logged out successfully"));
});

