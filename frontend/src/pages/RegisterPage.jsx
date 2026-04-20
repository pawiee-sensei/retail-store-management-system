import { useState } from "react";
import Header from "../components/layout/Header"; 
import { registerUser } from "../services/auth.js";

function RegisterPage (){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;


        setFormData((previousState) => ({
            ...previousState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');

        try {
            const data =  await registerUser(formData);
            console.log('Register success', data);
            setMessage('Registration successful.');
            setFormData({
                username: '',
                email: '',
                password: '',
            });
        } catch (error) {
            console.error('Register failed', error.message);
            setError(error.message);
        }
    };



    return (
        <>
        <Header isAuthenticated={false} />
    


        <section className="auth-page">
            <div className="auth-card">
                <h1>Register</h1>
                <p>Sign up to access your retail dashboard</p>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter Username"
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        </section>
        </>
    );
}

export default RegisterPage
