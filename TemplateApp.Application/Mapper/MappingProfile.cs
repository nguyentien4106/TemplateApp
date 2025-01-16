using AutoMapper;
using TemplateApp.Domain.DTOs.Product;
using TemplateApp.Infrastructure.Entities;

namespace TemplateApp.Application.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<ProductDto, Product>();
        }
    }
}
