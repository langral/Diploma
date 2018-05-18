using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class CourseIdViewModel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int? Number { get; set; }
    }
}
