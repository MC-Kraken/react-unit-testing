namespace Api.Db;

public class CompletedToDoItem
{
    public int Id { get; set; }
    public string Description { get; set; } = null!;
    public DateTime CompletedDate { get; set; }
}
