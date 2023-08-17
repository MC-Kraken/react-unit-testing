using Api.Db;
using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class CompletedToDoItemsController : ControllerBase
{
    private readonly ToDoContext _db;

    public CompletedToDoItemsController(ToDoContext db) => _db = db;

    [HttpGet]
    public IActionResult Get() => Ok(_db.CompletedToDoItems.ToList());
    
    [HttpPost]
    public IActionResult Post(CompletedToDoItemCreateRequest apiRequest)
    {
        //TODO: Add validation for description not null and completed date not in the future? Prob not needed
        
        var dbModel = new CompletedToDoItem
        {
            Description = apiRequest.Description,
            CompletedDate = apiRequest.CompletedDate,
        };

        _db.CompletedToDoItems.Add(dbModel);

        _db.SaveChanges();
        return Created($"{dbModel.Id}", dbModel);
    }
}