import express from "express";
import { createProductHandler, getProductHandler } from "../controller/product.controller.js";

const router = express.Router();

router.post("/", createProductHandler);
router.get("/", getProductHandler);

export default router;