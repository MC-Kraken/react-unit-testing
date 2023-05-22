using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Db;

public class CustomerOrder
{
    public Guid Id { get; set; }
    public Guid CustomerId { get; set; }

    [ForeignKey(nameof(CustomerId))]
    public Customer Customer { get; set; }

    public Guid OrderId { get; set; }

    [ForeignKey(nameof(OrderId))]
    public Order Order { get; set; }
}
