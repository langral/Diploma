using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Student : BaseEntity
    {
        public Student()
        {
            this.Record = new HashSet<Record>();
            this.Marks = new HashSet<Mark>();
            this.Comment = new HashSet<Comment>();
        }

        public string Name { get; set; }

        public int GroupId { get; set; }
        public Group Group;

        public ICollection<Mark> Marks { get; set; }
        public ICollection<Record> Record { get; set; }
        public ICollection<Comment> Comment { get; set; }
    }
}
