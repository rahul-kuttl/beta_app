// routes/userDetailRoute.js
import express, { Router } from "express";
import { saveUserDetails } from "../controller/_saveUserDetailController.js";
import { createSms } from "../controller/_sms-controller.js";

const router: Router = express.Router();

router.post("/save-user-details", saveUserDetails);
router.post("/read-sms", createSms);

export default router;
