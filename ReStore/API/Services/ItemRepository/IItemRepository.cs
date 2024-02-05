using API.Entities;

namespace API.Services.ItemRepository;

public interface IItemRepository
{
    Task<IEnumerable<ItemObject>> GetAllItems();
}