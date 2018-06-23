using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class AttestationViewModel
    {

        [Required]
        public int SubjectId { get; set; }
        [Required]
        public int Semester { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public string Department { get; set; }
        [Required]
        public string Specialty { get; set; }
    }
}
