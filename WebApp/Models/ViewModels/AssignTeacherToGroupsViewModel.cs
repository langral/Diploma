using Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class AssignTeacherToGroupsViewModel
    {
        [Required]
        public string TeacherId { get; set; }
        [Required]
        public List<Group> Group { get; set; }
    }
}
