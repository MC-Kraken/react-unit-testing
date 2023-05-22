namespace Api.Db;

public class Order
{
    public Guid Id { get; set; }
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; }
    public Store Store { get; set; }
    public Guid StoreId { get; set; }
}