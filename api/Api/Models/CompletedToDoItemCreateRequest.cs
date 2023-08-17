namespace Api.Models;

public class CompletedToDoItemCreateRequest
{
    public string Description { get; set; } = null!;
    public DateTime CompletedDate { get; set; }
}
