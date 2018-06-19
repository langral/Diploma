using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class RegisterTeacherViewModel : RegisterViewModel
    {
        [Required]
        public string FIO { get; set; }

    }
}
