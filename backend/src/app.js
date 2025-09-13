import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(cookieParser())

import userRoute from "./routes/donor.route.js"
app.use("/users", userRoute)

export default app