import { useContext,useEffect } from 'react';
import { AuthContext } from '../auth.context.jsx';
import { login, register, logout,getme } from '../services/auth.api.js';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside an AuthProvider');
    }

    const { user, setUser, loading, setLoading } = context;

const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
        const data = await login({
            email,
            password
        });

        console.log("LOGIN DATA:", data);
        console.log("USER:", data?.user);

        if (!data?.user) {
            console.log("NO USER IN RESPONSE");
            return false;
        }

        setUser(data.user);

        console.log("USER SET SUCCESSFULLY");

        return true;

    } catch (err) {
        console.log(
            "LOGIN ERROR:",
            err.response?.data?.message || err.message
        );

        return false;

    } finally {
        setLoading(false);
    }
};

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);

        try {
            const data = await register({
                username,
                email,
                password
            });

            setUser(data.user);

            return !!data?.user;

        } catch (err) {
            console.log("REGISTER ERROR:", err.response?.data?.message || err.message);
            return false;

        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);

        try {
            await logout();
            setUser(null);
            return true;

        } catch (err) {
            console.log("LOGOUT ERROR:", err.response?.data?.message || err.message);
            return false;

        } finally {
            setLoading(false);
        }
    };

            useEffect(()=>{
             const getsetUser= async()=>{
                const data=await getme();
                setUser(data.user);
                setLoading(false);
             }
             
             getsetUser();
    
        },[]);

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
    };
};














































// import { useContext } from 'react'
// import { AuthContext } from '../auth.context.jsx'
// import { login, register, logout } from '../services/auth.api.js'

// export const useAuth = () => {
//     const context = useContext(AuthContext)

//     if (!context) {
//         throw new Error('useAuth must be used inside an AuthProvider')
//     }

//     const { user, setUser, loading, setLoading } = context

//     const handleLogin = async ({ email, password }) => {
//         setLoading(true)
//         try {
//             const data = await login(email, password)
//             setUser(data.user)
//             return !!data?.user
//         } catch (err) {
//             console.log(err)
//             return false
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleRegister = async ({ username, email, password }) => {
//         setLoading(true)
//         try {
//             const data = await register(username, email, password)
//             setUser(data.user)
//             return !!data?.user
//         } catch (err) {
//             console.log(err)
//             return false
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleLogout = async () => {
//         setLoading(true)
//         try {
//             await logout()
//             setUser(null)
//             return true
//         } catch (err) {
//             console.log(err)
//             return false
//         } finally {
//             setLoading(false)
//         }
//     }

//     return { user, loading, handleRegister, handleLogin, handleLogout }
// } 
