using System.Linq.Expressions;
using TemplateApp.Domain.Models;
using TemplateApp.Domain.Models.Result;
using TemplateApp.Infrastructure.Entities;

namespace TemplateApp.Infrastructure.Services
{
    public interface IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        Task<Result<IEnumerable<TEntity>>> GetAllAsync(
            Expression<Func<TEntity, bool>>? filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            string[]? includeProperties = null);

        Task<Result<PaginationResultModel<TEntity>>> GetAllAsync(
            Pagination pagination,
            Expression<Func<TEntity, bool>>? filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            string[]? includeProperties = null);

        Task<Result<TEntity>> GetByIdAsync(Guid id, string[]? includeProperties = null);

        Task<Result<TEntity>> InsertAsync(TEntity entity);

        Task<Result<TEntity>> UpdateAsync(TEntity entity);

        Task<Result<TEntity>> DeleteAsync(TEntity entity);

        Task<Result<TEntity>> DeleteByIdAsync(Guid id);
    }
}
