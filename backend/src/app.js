import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js"
const app = express()
app.use(cors({
    origin: "https://smart-blood-donation-frontend.vercel.app",
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(cookieParser())

import userRoute from "./routes/donor.route.js"
import hospitalRoute from "./routes/hospital.route.js" 
import requestRoutes from "./routes/request.route.js";
app.use("/donor", userRoute)
app.use("/hospital", hospitalRoute)
app.use("/requests", requestRoutes);

app.use((err, req, res, next) => {
    console.error(err); // for debugging

    if (err instanceof ApiError) {
            return res.status(err.statusCode).json({
                statusCode: err.statusCode,
                success: err.success,
                message: err.message,  
                data: err.data,
                errors: err.errors
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});
export default app