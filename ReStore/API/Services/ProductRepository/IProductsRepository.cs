using API.Entities;

namespace API.Services.IProductRepository
{
    public interface IProductsRepository
    {
        Task<List<Product>> GetProducts();
        Task<Product> GetProductById(int id);
    }
}
