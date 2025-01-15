using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TemplateApp.Domain.Models;
using TemplateApp.Infrastructure.Entities;

namespace TemplateApp.Infrastructure.Services
{
    public class GenericRepository<TEntity>(AppDbContext db) : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        internal AppDbContext context = db;
        internal DbSet<TEntity> dbSet = db.Set<TEntity>();
        private static readonly char[] separator = [','];

        public virtual async Task<Result<IEnumerable<TEntity>>> GetAllAsync(
            Expression<Func<TEntity, bool>>? filter = null, 
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, 
            string[]? includeProperties = null)
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if(includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
            }

            return orderBy != null ? new Result<IEnumerable<TEntity>>().SetSuccess(await orderBy(query).ToListAsync()) 
                                   : new Result<IEnumerable<TEntity>>().SetSuccess(await query.ToListAsync());
        }

        public virtual async Task<Result<TEntity>> GetByIdAsync(Guid id, string[]? includeProperties = null)
        {
            IQueryable<TEntity> query = dbSet;

            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
            }

            var data = await query.FirstOrDefaultAsync(item => item.Id == id);

            if(data == null)
            {
                return Result<TEntity>.NotFound();
            }

            return new Result<TEntity>().SetSuccess(data);
        }

        public virtual async Task<Result<TEntity>> InsertAsync(TEntity entity)
        {
            try
            {
                await dbSet.AddAsync(entity);
                await Commit();
                return new Result<TEntity>().SetSuccess(entity);
            }
            catch (Exception ex) 
            {
                return new Result<TEntity>().SetError(ex.Message, entity);
            }
        }

        public virtual async Task<Result<TEntity>> UpdateAsync(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public virtual async Task<Result<TEntity>> DeleteAsync(TEntity entity)
        {
            try
            {
                dbSet.Remove(entity);
                await Commit();

                return Result<TEntity>.Success(entity);
            }
            catch (Exception ex) 
            {
                return Result<TEntity>.Failed(ex.Message, entity);
            }
        }

        public virtual async Task<Result<TEntity>> DeleteByIdAsync(Guid id)
        {
            var obj = await dbSet.FindAsync(id);

            if(obj == null)
            {
                return Result<TEntity>.NotFound();
            }

            return await DeleteAsync(obj);
        }

        public async Task Commit()
        {
            await context.SaveChangesAsync();
        }
    }
}
