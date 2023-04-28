using Api.Enums;

namespace Api.Controllers.Requests;

public class ToDoItemCreateRequest
{
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public Priority Priority { get; set; }
}