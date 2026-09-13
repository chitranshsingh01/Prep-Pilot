import React, { useState } from 'react';
import '../auth.form.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const { loading, handleRegister } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isRegistered = await handleRegister({
            username: username.trim(),
            email: email.trim(),
            password: password.trim(),
        });

        if (isRegistered) {
            navigate('/login');
        }
    };

    if (loading) {
        return (
            <main>
                <h1>Loading......</h1>
            </main>
        );
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="username"
                            name="username"
                            required
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="enter your password"
                        />
                    </div>

                    <div className="input-group">
                        <button className="button primary-button" type="submit">
                            Register
                        </button>
                    </div>
                </form>
                <p>
                    Already have an account?{' '}
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
