using API.Controllers.ErrorController;
using API.Data;
using API.DTO.Products;
using API.Entities;
using API.Services.IProductRepository;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProductsController : BaseApiController
{
    private readonly IMapper _mapper;
    private readonly IProductsRepository _productRepository;

    public ProductsController(StoreContext context, IProductsRepository productRepository, IMapper mapper)
    {
        _productRepository = productRepository;
        _mapper = mapper;
    }

    /// <summary>
    ///     Get the whole list of products
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        var products = await _productRepository.GetProducts();
        if (products.Count < 0) return NotFound();

        var response = _mapper.Map<IEnumerable<ProductsDto>>(products);
        return Ok(response);
    }

    /// <summary>
    ///     Get a single product
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _productRepository.GetProductById(id);
        var response = _mapper.Map<ProductsDto>(product);
        return Ok(response);
    }
}