using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Teacher : User
    {
        public Teacher()
        {
            this.Magazine = new HashSet<Magazine>();
            this.Subject = new HashSet<Subject>();
            this.Group = new HashSet<Group>();
            this.Course = new HashSet<Course>();
        }

        public ICollection<Magazine> Magazine;
        public ICollection<Subject> Subject;
        public ICollection<Group> Group;
        public ICollection<Course> Course;
    }
}
