using Api.Db;
using Api.Models.Cart;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
    [Route("{customerId:guid}/cart")]
    public class CartItemsController : ControllerBase
    {
        private readonly ItemsContext _db;

        public CartItemsController(ItemsContext db) => _db = db;

        [HttpPost]
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
            return Created($"{customerId}/cart", "Items were added to cart");
        }
    }
