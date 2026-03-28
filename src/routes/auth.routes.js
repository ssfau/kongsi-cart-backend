import express from "express";
import * as ctrl from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);

export default router;