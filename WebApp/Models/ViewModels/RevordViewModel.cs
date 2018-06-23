using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class RevordViewModel<T>
    {
        public List<T> Records { get; set; }
    }
}
