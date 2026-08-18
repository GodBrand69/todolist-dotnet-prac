// TodoApp.Infrastructure/Services/TodoService.cs
using System.Collections.Generic;
using System.Linq;
using TodoApp.Application.DTOs;
using TodoApp.Application.Interfaces;
using TodoApp.Domain.Entities;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Services
{
    public class TodoService : ITodoService
    {
        private readonly AppDbContext _context;

        public TodoService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TodoItem> GetTodos(int userId)
        {
            return _context.Todos.Where(t => t.UserId == userId).ToList();
        }

        public TodoItem CreateTodo(int userId, ToDoDto dto)
        {
            var todo = new TodoItem
            {
                Title = dto.Title,
                IsCompleted = dto.IsCompleted,
                UserId = userId
            };

            _context.Todos.Add(todo);
            _context.SaveChanges();

            return todo;
        }

        public bool UpdateTodo(int userId, int todoId, ToDoDto dto)
        {
            var todo = _context.Todos.Find(todoId);

            if (todo == null || todo.UserId != userId)
            {
                return false;
            }

            todo.Title = dto.Title;
            todo.IsCompleted = dto.IsCompleted;

            _context.Todos.Update(todo);
            _context.SaveChanges();

            return true;
        }

        public bool DeleteTodo(int userId, int todoId)
        {
            var todo = _context.Todos.Find(todoId);

            if (todo == null || todo.UserId != userId)
            {
                return false;
            }

            _context.Todos.Remove(todo);
            _context.SaveChanges();

            return true;
        }
    }
}