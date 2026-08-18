// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import Login from './components/login';
import TodoList from './components/todolist';

export default function App() {
    const authContext = useContext(AuthContext);
    
    if (!authContext) return null;

    return (
        <Routes>
            {/* If they have a token, kick them off the login page to the dashboard */}
            <Route 
                path="/login" 
                element={authContext.token ? <Navigate to="/" replace /> : <Login />} 
            />
            
            {/* If they DO NOT have a token, kick them back to login */}
            <Route 
                path="/" 
                element={authContext.token ? <TodoList /> : <Navigate to="/login" replace />} 
            />
            
            {/* Catch-all route for any undefined URLs */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}