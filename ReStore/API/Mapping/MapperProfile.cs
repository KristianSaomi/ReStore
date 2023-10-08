using API.DTO.Products;
using API.Entities;
using AutoMapper;

namespace API.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Product, ProductsDto>().ReverseMap();
        }
    }
}
