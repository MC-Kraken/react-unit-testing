using Microsoft.EntityFrameworkCore;

namespace Api.Db
{
    public class ItemsContext : DbContext
    {
        public DbSet<Item> ToDoItems { get; set; }

        public ItemsContext(DbContextOptions<ItemsContext> options) : base(options) { }

        public virtual DbSet<Item> Items { get; set; } = default!;
        public virtual DbSet<Order> Orders { get; set; } = default!;
        public virtual DbSet<Store> Stores { get; set; } = default!;
        public virtual DbSet<Customer> Customers { get; set; } = default!;
        public virtual DbSet<ItemOrder> ItemOrders { get; set; } = default!;
        public virtual DbSet<CustomerOrder> CustomerOrders { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().HasData(new List<Item>
            {
                // new()
                // {
                //     Id = 1,
                //     Description = "Pick up groceries"
                // },
                // new()
                // {
                //     Id = 2,
                //     Description = "Go to bank"
                // },
                // new()
                // {
                //     Id = 3,
                //     Description = "Go to post office"
                // }
            });
        }
    }
}
