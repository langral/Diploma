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
    }
}
