import { Router } from "express";
import { registerEmployer } from "../controllers/employer.controller.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: coverImage,
            maxCount: 1,
        }
    ]),registerEmployer
)

console.log('Register route loaded');

export default router