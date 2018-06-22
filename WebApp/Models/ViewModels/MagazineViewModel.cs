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
        public string TeacherId { get; set; }
        [Required]
        public int SubjectId { get; set; }
        [Required]
        public int GroupId { get; set; }
        [Required]
        public int CourseId { get; set; }
        [Required]
        public int Semester { get; set; }
        [Required]
        public string Year { get; set; }
        [Required]
        public string Filial { get; set; }
        [Required]
        public string Faculty { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public string TypeOfClass { get; set; }
        [Required]
        public string Specialty { get; set; }
    }
}
