using TemplateApp.Infrastructure;
using TemplateApp.Infrastructure.Entities;
using TemplateApp.Infrastructure.Services;

namespace TemplateApp.Application.Services.Products
{
    public class ProductService(AppDbContext db) : GenericRepository<Product>(db), IProductService
    {
    }
}
