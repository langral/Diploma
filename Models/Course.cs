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
            this.Teacher = new HashSet<Teacher>();
            this.Magazine = new HashSet<Magazine>();
        }

        public int Number { get; set; }

        public ICollection<Group> Group;
        public ICollection<Teacher> Teacher;
        public ICollection<Magazine> Magazine;
    }
}
