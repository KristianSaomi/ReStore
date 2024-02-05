using API.DTO.Item;
using API.Entities;
using API.Services.ItemRepository;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.V1.ItemController;

public class ItemController : BaseApiController
{
    private readonly IItemRepository _itemRepository;
    private readonly IMapper _mapper;

    public ItemController(IItemRepository itemRepository, IMapper mapper)
    {
        _itemRepository = itemRepository;
        _mapper = mapper;
    }

    /// <summary>
    ///     Get the whole list of items
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemObject>>> GetProducts()
    {
        var items = await _itemRepository.GetAllItems();

        var response = _mapper.Map<IEnumerable<ItemObjectDTO>>(items);
        return Ok(response);
    }
}