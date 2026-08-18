using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TodoApp.Application.DTOs;
using TodoApp.Application.Interfaces;

namespace TodoApp.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        // URL: /api/todo/all
        [HttpGet("all")]
        public IActionResult GetTodos()
        {
            var todos = _todoService.GetTodos(GetUserId());
            return Ok(todos);
        }

        // URL: /api/todo/create
        [HttpPost("create")]
        public IActionResult CreateTodo(ToDoDto dto)
        {
            var todo = _todoService.CreateTodo(GetUserId(), dto);
            return Ok(todo);
        }

        // URL: /api/todo/update/1
        [HttpPut("update/{id}")]
        public IActionResult UpdateTodo(int id, ToDoDto dto)
        {
            var success = _todoService.UpdateTodo(GetUserId(), id, dto);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

        // URL: /api/todo/delete/1
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var success = _todoService.DeleteTodo(GetUserId(), id);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}