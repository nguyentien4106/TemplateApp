using TemplateApp.Infrastructure.Entities;
using TemplateApp.Infrastructure.Services;

namespace TemplateApp.Application.Services.Products
{
    public interface IProductService : IGenericRepository<Product>
    {
    }
}
