using Api.Enums;
using Microsoft.EntityFrameworkCore;

namespace Api.Db;

public class ToDoContext : DbContext
{
    public DbSet<ToDoItem> ToDoItems { get; set; }
    public DbSet<CompletedToDoItem> CompletedToDoItems { get; set; }

    public ToDoContext(DbContextOptions<ToDoContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
            
    }
}