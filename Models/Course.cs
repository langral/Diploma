using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Course : BaseEntity
    {
        public Course()
        {
            this.Group = new HashSet<Group>();
        }

        public int Number { get; set; }

        public ICollection<Group> Group; 
    }
}
