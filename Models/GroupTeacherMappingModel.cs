using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class GroupTeacherMappingModel : BaseEntity
    {
        public string TeacherId { get; set; }
        public Teacher Teacher { get; set; }

        public int? GroupId { get; set; }
        public Group Group { get; set; }
    }
}
