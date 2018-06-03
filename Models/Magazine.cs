using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Magazine : BaseEntity
    {
        public Magazine()
        {
            this.Record = new HashSet<Record>();
            this.Comment = new HashSet<Comment>();
        }

        public int TeacherId { get; set; }
        public int SubjectId { get; set; }
        public int GroupId { get; set; }
        public int CourseId { get; set; }

        public int Semester { get; set; }
        public int Year { get; set; }
        public string Filial { get; set; }
        public string Faculty { get; set; }
        public string Level { get; set; }
        public string TypeOfClass { get; set; }

        public Teacher Teacher;
        public Subject Subject;
        public Subject Group;
        public Subject Course;
        public ICollection<Record> Record;
        public ICollection<Comment> Comment;
    }
}
