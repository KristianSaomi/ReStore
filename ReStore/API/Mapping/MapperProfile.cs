﻿using API.DTO.Item;
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
            CreateMap<ItemObject, ItemObjectDTO>().ReverseMap();
        }
    }
}
