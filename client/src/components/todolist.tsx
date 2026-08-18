// src/components/TodoList.tsx
import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/authContext';
import type { Todo } from '../types/types';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState<string>('');
    
    // New states for editing the text
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState<string>('');
    
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext must be used within AuthProvider");
    
    const { logout } = authContext;

    const fetchTodos = async () => {
        const { data } = await API.get<Todo[]>('/todo/all');
        setTodos(data);
    };

    useEffect(() => { 
        fetchTodos(); 
    }, []);

    const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return; // Don't allow empty tasks
        await API.post('/todo/create', { title, isCompleted: false });
        setTitle('');
        fetchTodos();
    };

    const toggleComplete = async (todo: Todo) => {
        // Updates just the checkbox
        await API.put(`/todo/update/${todo.id}`, { ...todo, isCompleted: !todo.isCompleted });
        fetchTodos();
    };

    const deleteTodo = async (id: number) => {
        await API.delete(`/todo/delete/${id}`);
        fetchTodos();
    };

    // --- NEW EDIT FUNCTIONS ---
    const startEdit = (todo: Todo) => {
        setEditingId(todo.id);
        setEditTitle(todo.title);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle('');
    };

    const saveEdit = async (todo: Todo) => {
        if (!editTitle.trim()) return;
        // Sends the new text to the backend while keeping the current isCompleted status
        await API.put(`/todo/update/${todo.id}`, { ...todo, title: editTitle });
        setEditingId(null);
        setEditTitle('');
        fetchTodos();
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <div className="d-flex justify-content-between mb-4">
                <h2>My Tasks</h2>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
            
            <form onSubmit={addTodo} className="d-flex mb-4">
                <input 
                    className="form-control me-2" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="Add a new task..." 
                    required 
                />
                <button className="btn btn-success" type="submit">Add</button>
            </form>

            <ul className="list-group shadow-sm">
                {todos.map(todo => (
                    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editingId === todo.id ? (
                            // UI WHEN IN EDIT MODE
                            <div className="d-flex w-100">
                                <input 
                                    type="text" 
                                    className="form-control me-2"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    autoFocus
                                />
                                <button className="btn btn-sm btn-success me-2" onClick={() => saveEdit(todo)}>
                                    Save
                                </button>
                                <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            // UI NORMAL STATE
                            <>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input me-3" 
                                        checked={todo.isCompleted} 
                                        onChange={() => toggleComplete(todo)} 
                                    />
                                    <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                                        {todo.title}
                                    </span>
                                </div>
                                <div>
                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(todo)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(todo.id)}>
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}