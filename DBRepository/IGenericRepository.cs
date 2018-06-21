using Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository
{
    public interface IGenericRepository<T> 
    {
        IQueryable<T> GetAll();
        IQueryable<T> Get(Func<T, bool> predicate);
        Task<T> Get(int id);
        Task<T> Get(Guid id);
        Task Insert(T entity);
        Task Update(T entity);
        Task Delete(T entity);
        Task Delete(int id);
    }
}
