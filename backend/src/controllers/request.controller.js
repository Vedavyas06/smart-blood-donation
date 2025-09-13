import { BloodRequest } from "../models/request.model.js";
import { Donor } from "../models/donor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// create a new blood request by hospital
export const createBloodRequest = asyncHandler(async (req, res) => {
  const { bloodGroup, quantity } = req.body;
  const hospital = req.hospital; // coming from verifyJWT

  if (!bloodGroup) {
    throw new ApiError(400, "Blood group is required");
  }

  const request = await BloodRequest.create({
    hospital: hospital._id,
    bloodGroup,
    quantity,
    location: hospital.location,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Blood request created", { request }));
});

// find matching donors for the request
import { sendEmail } from "../utils/sendEmail.js";

// find matching donors for the request
export const findMatchingDonors = asyncHandler(async (req, res) => {
  const { bloodGroup } = req.body;
  const hospital = req.hospital;

  if (!bloodGroup) {
    throw new ApiError(400, "Blood group is required");
  }

  const donors = await Donor.find({
    bloodGroup: bloodGroup,
    location: hospital.location,
  }).select("-password -refreshToken");

  if (donors.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, "No matching donors found", { donors: [] }));
  }

  // send email to each donor
  for (const donor of donors) {
    await sendEmail({
      to: donor.email,
      subject: "Urgent Blood Request",
      text: `Dear ${donor.name},\n\nA hospital near you is in urgent need of ${bloodGroup} blood.\nPlease consider donating.`,
      html: `
        <h2>Urgent Blood Request</h2>
        <p>Dear <b>${donor.name}</b>,</p>
        <p>A hospital near you (<b>${hospital.name}</b>) urgently requires <b>${bloodGroup}</b> blood.</p>
        <p>Quantity Needed: ${req.body.quantity || "1"} units</p>
        <p>Location: ${hospital.location}</p>
        <p>Please consider donating at the earliest.</p>
      `,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Emails sent to matching donors", { donors }));
});