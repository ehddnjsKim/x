import express from "express";
import * as authController from "../controller/auth.mjs";

const router = express.Router();

router.post("/login", authController.login);
router.get("/me", authController.getMe);
router.get("/logout", authController.logout);

export default router;
