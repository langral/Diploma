using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class GroupSubjectMappingModel : BaseEntity
    {
        public int? GroupId { get; set; }
        public Group Group { get; set; }

        public int? SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
