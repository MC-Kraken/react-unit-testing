using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Db;

public class ItemOrder
{
    public Guid Id { get; set; }
    public Guid ItemId { get; set; }

    [ForeignKey(nameof(ItemId))]
    public Item Item { get; set; }

    public Guid OrderId { get; set; }

    [ForeignKey(nameof(OrderId))]
    public Order Order { get; set; }
}