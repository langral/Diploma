using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class RecordIdViewModel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int MagazineId { get; set; }
        [Required]
        public int StudentId { get; set; }
        [Required]
        public string Visit { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
