using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class RecordsViewModel
    {
        public int MagazineId { get; set; }
        public List<RecordViewModel> records { get; set; }
    }
}
