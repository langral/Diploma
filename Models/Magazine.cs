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
        }

        public int TeacherId { get; set; }
        public int SubjectId { get; set; }

        public Teacher Teacher;
        public Subject Subject;
        public ICollection<Record> Record;
    }
}
