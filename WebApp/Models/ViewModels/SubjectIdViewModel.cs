using Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class SubjectIdViewModel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
       // [Required]
       // public List<Teacher> Teacher { get; set; }
        [Required]
        public List<Group> Group { get; set; }
    }
}
