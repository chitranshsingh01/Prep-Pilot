import React from 'react'
import '../auth.form.scss'

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

   
    return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" name="email" required placeholder='enter your email'>
                    </input>
                </div>
                <div className="input-group">
                    <input type="password" id="password" name="password" required placeholder='enter your password'></input>
                </div>
                <div className="input-group">
                    <button className="button primary-button" type="submit">Login</button>
                </div>
            </form>
        </div>
    </main>
  )
}

export default Login
