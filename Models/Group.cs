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
            this.Magazine = new HashSet<Magazine>();
            this.AttestationRecord = new HashSet<AttestationRecord>();
        }

        public int Number { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }

        public ICollection<Subject> Subject;
        public ICollection<Teacher> Teacher;
        public ICollection<Student> Student { get; set; }
        public ICollection<Magazine> Magazine;
        public ICollection<AttestationRecord> AttestationRecord;
    }
}
