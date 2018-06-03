using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class CommentIdViewModel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Note { get; set; }
    }
}
