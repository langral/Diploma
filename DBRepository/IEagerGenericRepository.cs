using Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository
{
    public interface IEagerGenericRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetEagerAll(string children);
        Task<T> GetEager(int id, string children);
        IQueryable<T> GetEager(Func<T, bool> predicate, string children);
    }
}
