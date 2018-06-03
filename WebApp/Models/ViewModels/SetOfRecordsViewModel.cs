using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class SetOfRecordsViewModel
    {
        [Required]
        public int MagazineId { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int GroupId { get; set; }
    }
}
