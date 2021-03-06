﻿using Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class GroupViewModel
    {
        [Required]
        public int? Number { get; set; }
        [Required]
        public int CourseId { get; set; }
        public List<Subject> Subject { get; set; }
    }
}
