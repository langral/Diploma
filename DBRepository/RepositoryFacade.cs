using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DBRepository
{
    public class RepositoryFacade<TContext> : IRepositoryFacade where TContext : DbContext
    {
        protected readonly TContext context;

        public RepositoryFacade(TContext libraryContext)
        {
            this.context = libraryContext;
        }

        public IGenericRepository<T> CreateGenericRepository<T>() where T : BaseEntity
        {
            return new GenericRepository<T, TContext>(this.context);
        }

        public IGenericRepository<T> CreateEagerGenericRepository<T>() where T : BaseEntity
        {
            return new EagerGenericRepository<T, TContext>(this.context);
        }
    }
}
