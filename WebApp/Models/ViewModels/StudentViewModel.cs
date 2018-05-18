using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class StudentViewModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int GroupId { get; set; }
    }
}
