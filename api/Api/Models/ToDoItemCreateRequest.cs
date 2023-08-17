using Api.Enums;

namespace Api.Models;

public class ToDoItemCreateRequest
{
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public Priority Priority { get; set; }
}