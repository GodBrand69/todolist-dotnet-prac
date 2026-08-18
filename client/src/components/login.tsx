import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isRegister, setIsRegister] = useState<boolean>(false);
    
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext must be used within AuthProvider");
    
    const { login, register } = authContext;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await register(username, password);
                alert("Registered successfully! You can now log in.");
                setIsRegister(false);
            } else {
                await login(username, password);
                navigate('/');
            }
        } catch (err: any) {
            alert("Error: " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">{isRegister ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <input 
                    className="form-control mb-3" 
                    placeholder="Username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    className="form-control mb-3" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                />
                <button className="btn btn-primary w-100" type="submit">
                    {isRegister ? "Sign Up" : "Login"}
                </button>
                <button type="button" className="btn btn-link mt-2" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "Already have an account?" : "Need an account?"}
                </button>
            </form>
        </div>
    );
}