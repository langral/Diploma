using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class CourseTeacherMappingModel : BaseEntity
    {
        public int? CourseId { get; set; }
        public Course Course { get; set; }

        public int? TeacherId { get; set; }
        public Subject Teacher { get; set; }
    }
}
