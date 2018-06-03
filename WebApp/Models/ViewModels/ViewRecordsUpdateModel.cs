using Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class ViewRecordsUpdateModel
    {
        [Required]
        public Record[] Records { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
