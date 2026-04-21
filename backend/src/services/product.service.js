import pool from '../config/db.js';

export const createProducts = async (name, price, stock, category) => {
    if (!name || !price || !stock || !category) {
      throw new Error('All fields are required');
    }
  
    const [result] = await pool.query('INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)',
        [name, price, stock, category]);
    return {
      id: result.insertId,
      name,
      price,
      stock,
      category,
    };
};

export const getProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    return rows;
};

