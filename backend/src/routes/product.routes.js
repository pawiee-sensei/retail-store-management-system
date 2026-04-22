import express from "express";
import { createProductHandler, getProductHandler, updateProductHandler, deleteProductHandler } from "../controller/product.controller.js";

const router = express.Router();

router.post("/", createProductHandler);
router.get("/", getProductHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);


export default router;