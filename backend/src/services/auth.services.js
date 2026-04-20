import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (username, email, password) => {
    if (!username || !email || !password) {
        throw new Error('All fields are required');
    }

    const [existingUsername] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUsername.length > 0) {
        throw new Error('User already exists');
    }

    const [existingEmail] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingEmail.length > 0) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    
    return {
        id: result.insertId,
        username,
        email,
    };
};

export const loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error('All fields are required');
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
        throw new Error('invalid email');
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('invalid password');
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
};

