import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
}

const AuthContext = createContext<{token, setToken} | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken_] = useState<string | null>(
        typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    );

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if(token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
        }
    }, [token]);

    // const isAuthenticated = !!token;

    const contextValue = useMemo(
        () => ({
            token,
            setToken
        }),
        [token]);

    return (
        <AuthContext.Provider value={contextValue} >
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context =  useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}