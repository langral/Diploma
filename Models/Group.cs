using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Group : BaseEntity
    {
        public Group()
        {
            this.Subject = new HashSet<Subject>();
            this.Teacher = new HashSet<Teacher>();
            this.Student = new HashSet<Student>();
        }

        public int Number { get; set; }

        public int CourseId { get; set; }
        public Course Course;

        public ICollection<Subject> Subject;
        public ICollection<Teacher> Teacher;
        public ICollection<Student> Student;
    }
}
