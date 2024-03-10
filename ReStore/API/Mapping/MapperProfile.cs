using API.DTO.Basket;
using API.DTO.Item;
using API.DTO.Products;
using API.Entities;
using API.Entities.Basket;
using AutoMapper;

namespace API.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Product, ProductsDto>().ReverseMap();
            CreateMap<ItemObject, ItemObjectDTO>().ReverseMap();
            CreateMap<Basket, BasketDto>()
                .ForMember(dest => dest.Items, conf => conf.MapFrom(x => x.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                })));
        }
    }
}