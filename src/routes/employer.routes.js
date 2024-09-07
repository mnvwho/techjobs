import { Router } from "express";
import { registerEmployer } from "../controllers/employer.controller.js";

const router = Router()

router.route("/register").post(registerEmployer)

console.log('Register route loaded');

export default router