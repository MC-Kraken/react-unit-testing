namespace Api.Db;

public class CartItem
{
    public Guid Id { get; set; }
    public Guid ItemId { get; set; }
    public Item Item { get; set; }
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; }
}
