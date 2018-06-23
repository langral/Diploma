using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class ATRResponseViewModel
    {
        public int id { get; set; }
        public int Course { get; set; }
        public int Group { get; set; }
        public DateTime Date { get; set; }
    }
}
