import { createProducts, getProducts, updateProducts, deleteProducts } from "../services/product.service.js";


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

export const updateProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock, category } = req.body;

        const updated = await updateProducts(id, name, price, stock, category);
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteProducts(id);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}