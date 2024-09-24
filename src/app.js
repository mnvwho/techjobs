import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import employerRouter from './routes/employer.routes.js'

app.use("/api/v1/employercards", employerRouter)

console.log('Routes:', employerRouter);


export {app}