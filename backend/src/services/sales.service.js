import db from '../config/db.js';

export const processCheckout = async (cart, total) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [salesResult] = await connection.query(
            'INSERT INTO sales (total) VALUES (?)',
            [total]
        );

        const salesId = salesResult.insertId;

        for (const item of cart) {

            const [rows] = await connection.query(
                "Select stock from products where id = ?",
                [item.id]
            );

        // Check stock
        const stock = rows[0].stock;
        // check if stock is enough
        if(stock < item.quantity) {
            throw new Error(`Insufficient stock ${item.id}`);
        }

        // insert the item into the sale_items table
        await connection.query(
            `INSERT INTO sale_items (sale_id, product_id, quantity) VALUES (?, ?, ?)`, 
            [salesId, item.id, item.quantity]
        );

        // deduct the stock of the product on the products table
        await connection.query(
            `UPDATE products SET stock = stock - ? WHERE id = ?`,
            [item.quantity, item.id]
        );
    }
        await connection.commit();

        return {
            salesId,
            total,
        };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
