import express from "express";
import { checkout } from "../controller/sales.controller.js";

const router = express.Router();

router.post("/checkout", checkout);

export default router;