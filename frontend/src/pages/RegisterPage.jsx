import { useState } from "react";
import Header from "../components/layout/Header";

function RegisterPage (){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;


        setFormData((previousState) => ({
            ...previousState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Register data', formData);
    };



    return (
        <>
        <Header isAuthenticated={false} />
    


        <section className="auth-page">
            <div className="auth-card">
                <h1>Register</h1>
                <p>Sign up to access your retail dashboard</p>

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