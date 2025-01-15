using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TemplateApp.Application.Services.Products;
using TemplateApp.Domain.Constants;
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
        public async Task<Result<IEnumerable<Product>>> GetAll()
        {
            return await service.GetAllAsync();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<Result<Product>> GetById(Guid id)
        {
            return await service.GetByIdAsync(id);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<Result<Product>> Insert(Product product)
        {
            return await service.InsertAsync(product);
        }
    }
}
