import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

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
