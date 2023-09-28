using Api.Enums;

namespace Api.Models;

public class ToDoItemCreateRequest
{
    public string Description { get; set; } = null!;
    public DateTime? DueDate { get; set; }
    public Priority Priority { get; set; }
}