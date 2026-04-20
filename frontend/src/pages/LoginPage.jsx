import { useState } from "react";
import Header from "../components/layout/Header";

function LoginPage () {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        console.log('Login data', formData);
    };

return (
    <>
    <Header isAuthenticated={false} />

    <section className="auth-page">
        <div className="auth-card">
            <h1>Login</h1>
            <p>Sign in to access your retail dashboard</p>

            <form onSubmit={handleSubmit} className="auth-form">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                
                
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                
                <button type="submit">Login</button>
            </form>
        </div>

    </section>

    </>
);
}

export default LoginPage