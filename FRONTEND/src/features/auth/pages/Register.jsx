import { useNavigate } from 'react-router-dom'
import '../auth.form.scss'

const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" name="email" required placeholder='enter your email'></input>
                    <label htmlFor='name'>Username</label>

                    <input type="text" id="name" name="name" required placeholder='Enter your UserName'></input>
                    <div className="input-group">
                        <label htmlFor='password'>Password</label>
                        <input type="password" id="password" name="password" required placeholder='enter your password'></input>    
                    </div>
                    <button className="button primary-button" type="submit">Register</button>
                </div>
            </form>
            <p>Already have an account? <button type="button" onClick={() => navigate('/login')}>Login</button></p>
        </div>
    </main>
  )
}


export default Register; 
