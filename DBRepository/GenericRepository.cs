using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository
{
    public class GenericRepository<T, TContext> : IGenericRepository<T> where T : BaseEntity
                                                                        where TContext : DbContext
    {
        protected readonly TContext context;
        protected DbSet<T> entities;
        protected string errorMessage = string.Empty;

        public GenericRepository(TContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }

        public IQueryable<T> GetAll()
        {
            return entities.AsQueryable();
        }

        public Task<T> Get(int id)
        {
            return entities.FindAsync(id);
        }

        public Task<T> Get(Guid id)
        {
            return entities.FindAsync(id);
        }

        public IQueryable<T> Get(Func<T, bool> predicate)
        {
            return entities.Where(predicate).AsQueryable();
        }

        public async Task Insert(T entity)
        {
            await context.Set<T>().AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task Update(T entity)
        {
            context.Set<T>().Update(entity);
            await context.SaveChangesAsync();
        }

        public async Task Delete(T entity)
        {
            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var entity = await entities.FindAsync(id);

            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();
        }
    }
}
