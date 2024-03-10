using API.Data;
using API.DTO.Basket;
using API.Entities.Basket;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.V1.BasketController
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public BasketController(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket();

            if (basket == null) return NotFound();

            var newBasket = _mapper.Map<Basket, BasketDto>(basket);

            return newBasket;
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetriveBasket();
            if (basket == null) basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            var newBasket = _mapper.Map<Basket, BasketDto>(basket);


            if (result) return CreatedAtRoute("GetBasket", newBasket);

            return BadRequest(new ProblemDetails { Title = "Problems saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetriveBasket();
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
        }

        private async Task<Basket> RetriveBasket()
        {
            var basket = _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefault(x => x.BuyerId == Request.Cookies["buyerId"]);
            return basket;
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);

            return basket;
        }
    }
}