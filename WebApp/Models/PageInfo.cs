using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class PageInfo<T> where T : BaseEntity
    {
        public int? CurrentPage { get; set; }
        public int? PageSize { get; set; }
        public int? TotalElements { get; set; }
        public IQueryable<T> Records { get; set; }
    }
}
