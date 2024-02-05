using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ItemRepository
{
    public class ItemRepository : IItemRepository
    {
        private readonly StoreContext _context;

        public ItemRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ItemObject>> GetAllItems()
        {
            var item = await _context.Items.ToListAsync();

            return item;
        }
    }
}
