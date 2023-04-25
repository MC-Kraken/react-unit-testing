using Api.Enums;

namespace Api.Controllers
{
    public class ToDoItemCreateModel
    {
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public Priority Priority { get; set; }
    }
}
