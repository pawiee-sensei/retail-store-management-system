import {registerUser} from "../services/auth.services.js";
import {loginUser} from "../services/auth.services.js";

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = await registerUser(username, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await loginUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

