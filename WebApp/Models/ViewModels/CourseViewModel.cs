using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class CourseViewModel
    {
        [Required]
        public int? Number { get; set; }
    }
}
