using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services.IProductRepository;

public class ProductsRepository : IProductsRepository
{
    private readonly StoreContext _context;
    private readonly ILogger _logger;

    public ProductsRepository(StoreContext context, ILogger logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<Product>> GetProducts()
    {
        var products = await _context.Products.ToListAsync();

        if (products.Count <= 0) _logger.LogInformation("There is no products in the list");

        return products;
    }

    public async Task<Product> GetProductById(int id)
    {
        var product = await _context.Products.SingleOrDefaultAsync(x => x.Id == id);

        return product;
    }
}