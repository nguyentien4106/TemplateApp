using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TemplateApp.Application.Extensions;
using TemplateApp.Application.Services.Products;
using TemplateApp.Domain.Constants;
using TemplateApp.Domain.DTOs.Product;
using TemplateApp.Domain.Models;
using TemplateApp.Infrastructure.Entities;

namespace TemplateApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Administrator)]
    public class ProductsController(IProductService service) : ControllerBase
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<Result<List<ProductDto>>> GetAll()
        {
            var result = await service.GetAllAsync();
            return result.ToDto<IEnumerable<Product>, List<ProductDto>>();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<Result<ProductDto>> GetById(Guid id)
        {
            var result = await service.GetByIdAsync(id);
            return result.ToDto<Product, ProductDto>();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<Result<ProductDto>> Insert(Product product)
        {
            var result = await service.InsertAsync(product);
            return result.ToDto<Product, ProductDto>();
        }


        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<Result<ProductDto>> Delete(Guid id)
        {
            var result = await service.DeleteByIdAsync(id);

            return result.ToDto<Product, ProductDto>();
        }
    }
}
