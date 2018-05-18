using Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class GroupIdViewModel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int? Number { get; set; }
        [Required]
        public int CourseId { get; set; }
        [Required]
        public List<Subject> Subject { get; set; }
    }
}
