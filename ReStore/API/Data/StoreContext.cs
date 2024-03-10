using API.Entities;
using API.Entities.Basket;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        /// <summary>
        /// Base (DbContext), have a option that is going to be passed to the base class.
        /// </summary>
        /// <param name="options"></param>
        public StoreContext(DbContextOptions options) : base(options)
        {

        }
        //Represent a table in the database
        public DbSet<Product> Products { get; set; }
        public DbSet<ItemObject> Items { get; set; }
        public DbSet<Basket> Baskets { get; set; }
    }
}
