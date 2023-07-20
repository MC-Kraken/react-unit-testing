namespace Api.Db
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public bool Sold { get; set; }
        public Guid StoreId { get; set; }
        public int Stock { get; set; }
    }
}
