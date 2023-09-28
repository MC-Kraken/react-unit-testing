using Api.Enums;

namespace Api.Db;

public class ToDoItem
{
    public int Id { get; set; }
    public string Description { get; set; } = null!;
    public DateTime? DueDate { get; set; }
    public Priority Priority { get; set; }
    public bool Completed { get; set; }
    public DateTime? CompletedDate { get; set; }
}