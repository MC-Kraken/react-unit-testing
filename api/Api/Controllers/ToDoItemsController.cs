using Api.Controllers.Requests;
using Api.Db;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ToDoItemsController : ControllerBase
{
    private readonly ToDoContext _db;

    public ToDoItemsController(ToDoContext db) => _db = db;

    [HttpGet]
    public IActionResult Get() => Ok(_db.ToDoItems.ToList());

    [HttpPost]
    public IActionResult Post(ToDoItemCreateRequest apiRequest)
    {
        //TODO: Add validation for description not null and due date not in the past
        
        ToDoItem dbModel = new()
        {
            Description = apiRequest.Description,
            DueDate = apiRequest.DueDate,
            Priority = apiRequest.Priority
        };

        _db.ToDoItems.Add(dbModel);

        _db.SaveChanges();
        return Created($"{dbModel.Id}", dbModel);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var itemToRemove = _db.ToDoItems.FirstOrDefault(x => x.Id == id);

        if (itemToRemove is null)
        {
            return NotFound();
        }

        _db.ToDoItems.Remove(itemToRemove);
        _db.SaveChanges();

        return NoContent();
    }
    
    [HttpPatch("{id:int}")]
    public async Task<IActionResult> Patch(int id, [FromBody] JsonPatchDocument<ToDoItem> request)
    {
        var existingItem = _db.ToDoItems.FirstOrDefault(i => i.Id == id);

        if (existingItem is null)
        {
            return NotFound("Could not find an item that matched the provided id");
        }
        
        request.ApplyTo(existingItem);
        
        await _db.SaveChangesAsync();
        
        return Ok();
    }
}