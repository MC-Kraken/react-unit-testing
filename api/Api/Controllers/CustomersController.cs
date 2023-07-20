using Api.Db;
using Api.Models;
using Api.Models.Cart;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ItemsContext _db;

        public CustomersController(ItemsContext db) => _db = db;

        [HttpGet]
        public IActionResult Get() => Ok(_db.Items.ToList());

        [HttpPost]
        public IActionResult Post(CustomerCreateModel apiModel)
        {
            Customer model = new()
            {
                FirstName = apiModel.FirstName,
                LastName = apiModel.LastName,
                Email = apiModel.Email,
            };

            _db.Customers.Add(model);
            _db.SaveChanges();
            var customer = _db.Customers.First(x => x.Email == model.Email);
            // _db.ToDoItems.Add(dbModel);
            //
            // _db.SaveChanges();
            // return Created($"{dbModel.Id}", dbModel);
            return Created("/customers", customer);
        }

        //     [HttpDelete("{id}")]
        //     public IActionResult Delete(int id)
        //     {
        //         var itemToRemove = _db.Items.FirstOrDefault(x => x.Id == id);
        //
        //         if (itemToRemove == null)
        //         {
        //             return NotFound();
        //         }
        //
        //         _db.ToDoItems.Remove(itemToRemove);
        //         _db.SaveChanges();
        //
        //         return NoContent();
        //     }
        
        [HttpPost("{customerId}/cart")]
        public IActionResult Post(CartItemAddModel request)
        {
            var customerId = RouteData.Values["customerId"]!.ToString();
            foreach (var item in request.Items)
            {
                _db.CartItems.Add(new CartItem
                {
                    CustomerId = Guid.Parse(customerId!),
                    ItemId = item
                });
            }
            _db.SaveChanges();
            return Created($"/customers/{customerId}/cart", "Items were added to cart");
        }
    }
    
}