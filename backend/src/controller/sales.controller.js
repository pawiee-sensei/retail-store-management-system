import { processCheckout } from "../services/sales.service.js";

export const checkout = async (req, res) => {
    try {
        const { cart, total } = req.body;
        const result = await processCheckout(cart, total);
        res.status(200).json({
            id: result.salesId,
            total: result.total,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};