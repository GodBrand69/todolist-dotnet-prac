import { createContext, useState, type ReactNode } from 'react';
import API from '../services/api';

interface AuthContextType {
    token: string | null;
    login: (u: string, p: string) => Promise<void>;
    register: (u: string, p: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const login = async (username: string, password: string): Promise<void> => {
        const { data } = await API.post('/auth/login', { username, password });
        localStorage.setItem('token', data.token);
        setToken(data.token);
    };

    const register = async (username: string, password: string): Promise<void> => {
        await API.post('/auth/register', { username, password });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};