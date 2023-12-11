import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    // default axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.token}`

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const dataParsed = JSON.parse(data)
            setAuth({
                ...auth,
                user: dataParsed.user,
                token: dataParsed.token
            })
        }
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthProvider };
