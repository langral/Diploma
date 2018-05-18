using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class RecordViewModel
    {
        [Required]
        public int MagazineId { get; set; }
        [Required]
        public int StudentId { get; set; }
    }
}
