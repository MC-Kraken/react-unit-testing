// using Api.Db;
// using Microsoft.AspNetCore.Mvc;
//
// namespace Api.Controllers
// {
//     [ApiController]
//     [Route("[controller]")]
//     public class ItemsController : ControllerBase
//     {
//         private readonly ItemsContext _db;
//
//         public ItemsController(ItemsContext db) => _db = db;
//
//         [HttpGet]
//         public IActionResult Get() => Ok(_db.ToDoItems.ToList());
//
//         [HttpPost]
//         public IActionResult Post(ToDoItemCreateModel apiModel)
//         {
//             // Item dbModel = new()
//             // {
//             //     Description = apiModel.Description
//             // };
//
//             // _db.ToDoItems.Add(dbModel);
//             //
//             // _db.SaveChanges();
//             // return Created($"{dbModel.Id}", dbModel);
//             return Created("/items",new Item());
//         }
//
//         [HttpDelete("{id}")]
//         public IActionResult Delete(int id)
//         {
//             var itemToRemove = _db.ToDoItems.FirstOrDefault(x => x.Id == id);
//
//             if (itemToRemove == null)
//             {
//                 return NotFound();
//             }
//
//             _db.ToDoItems.Remove(itemToRemove);
//             _db.SaveChanges();
//
//             return NoContent();
//         }
//     }
// }