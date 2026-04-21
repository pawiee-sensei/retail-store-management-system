import { createProducts, getProducts } from "../services/product.service.js";

export const createProductHandler = async (req, res) => {
    try {
        const { name, price, stock, category } = req.body;
        const product = await createProducts(name, price, stock, category);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductHandler = async (_req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
