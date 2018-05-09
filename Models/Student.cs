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
        }

        public string Name { get; set; }

        public int GroupId { get; set; }
        public Group Group;

        public ICollection<Record> Record;
    }
}
