using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class TeacherSubjectMappingModel : BaseEntity
    {
        public int? TeacherId { get; set; }
        public Teacher Teacher { get; set; }

        public int? SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
