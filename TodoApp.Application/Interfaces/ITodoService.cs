using System.Collections.Generic;
using TodoApp.Application.DTOs;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Interfaces
{
    public interface ITodoService
    {
        IEnumerable<TodoItem> GetTodos(int userId);
        TodoItem CreateTodo(int userId, ToDoDto dto);
        bool UpdateTodo(int userId, int todoId, ToDoDto dto);
        bool DeleteTodo(int userId, int todoId);
    }
}