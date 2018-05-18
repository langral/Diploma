using Models;


namespace DBRepository
{
    public interface IRepositoryFacade
    {
        IGenericRepository<T> CreateGenericRepository<T>() where T : BaseEntity;
        IGenericRepository<T> CreateEagerGenericRepository<T>() where T : BaseEntity;
    }
}
