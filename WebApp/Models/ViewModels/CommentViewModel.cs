using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class CommentViewModel
    {
        [Required]
        public int MagazineId { get; set; }
        [Required]
        public string note { get; set; }
        [Required]
        public int GroupId { get; set; }
    }
}
