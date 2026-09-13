// import React from 'react'
// import '../auth.form.scss'

// const Login = () => {

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     }

   
//     return (
//     <main>
//         <div className="form-container">
//             <h1>Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="input-group">
//                     <label htmlFor='email'>Email</label>
//                     <input type="email" id="email" name="email" required placeholder='enter your email'>
//                     </input>
//                 </div>
//                 <div className="input-group">
//                     <input type="password" id="password" name="password" required placeholder='enter your password'></input>
//                 </div>
//                 <div className="input-group">
//                     <button className="button primary-button" type="submit">Login</button>
//                 </div>
//             </form>
//         </div>
//     </main>
//   )
// }

// export default Login


import React, { useState } from 'react';
import '../auth.form.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        const isLoggedIn = await handleLogin({
            email: trimmedEmail,
            password: trimmedPassword
        });

        console.log("isLoggedIn =", isLoggedIn);

        if (isLoggedIn) {
            navigate('/');
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
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

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
                        <button
                            className="button primary-button"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>

                    <p>
                        Dont have an account?{' '}
                        <Link
                            to="/register"
                            style={{ textDecoration: 'none' }}
                        >
                            Register
                        </Link>
                    </p>

                </form>
            </div>
        </main>
    );
};

export default Login;