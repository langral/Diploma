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

        public string TeacherId { get; set; }
        public int SubjectId { get; set; }
        public int GroupId { get; set; }
        public int CourseId { get; set; }

        public int Semester { get; set; }
        public string Year { get; set; }
        public string Filial { get; set; }
        public string Faculty { get; set; }
        public string Level { get; set; }
        public string Specialty { get; set; }
        public string TypeOfClass { get; set; }

        public Teacher Teacher { get; set; }
        public Subject Subject { get; set; }
        public Group Group { get; set; }
        public Course Course { get; set; }

        public ICollection<Record> Record;
        public ICollection<Comment> Comment;
    }
}
