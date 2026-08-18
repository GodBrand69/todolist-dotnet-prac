using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.Interfaces;
using TodoApp.Application.DTOs;

namespace TodoApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(UserDto dto)
        {
            _authService.Register(dto.Username, dto.Password);
            return Ok();
        }

        [HttpPost("login")]
        public IActionResult Login(UserDto dto)
        {
            var token = _authService.Authenticate(dto.Username, dto.Password);
            if (token == null) return Unauthorized("Invalid credentials.");
            return Ok(new { Token = token });
        }
    }
}