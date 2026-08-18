using System;
using System.Collections.Generic;
using System.Text;

namespace TodoApp.Application.DTOs
{
    public class ToDoDto
    {
        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
    }
}
