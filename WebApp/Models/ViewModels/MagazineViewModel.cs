using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class MagazineViewModel
    {
        [Required]
        public int TeacherId { get; set; }
        [Required]
        public int SubjectId { get; set; }
        [Required]
        public int Semester { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public string Filial { get; set; }
        [Required]
        public string Faculty { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public string TypeOfClass { get; set; }
    }
}
