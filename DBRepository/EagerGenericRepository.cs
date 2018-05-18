using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository
{
    public class EagerGenericRepository<T, TContext> : GenericRepository<T, TContext>, IEagerGenericRepository<T> where T : BaseEntity
                                                                                                        where TContext : DbContext
    {
        public EagerGenericRepository(TContext context) : base(context)
        {
        }

        public Task<T> GetEager(int id, string children)
        {
            return entities.Include(children).SingleAsync(el => el.Id == id);
        }

        public IQueryable<T> GetEagerAll(string children)
        {
            return entities.Include(children);
        }

        public IQueryable<T> GetEager(Func<T, bool> predicate, string children)
        {
            return entities.Include(children).Where(predicate).AsQueryable();
        }

    }
}
