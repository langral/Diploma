using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Comment : BaseEntity
    {
        public int MagazineId { get; set; }
        public int StudentId { get; set; }

        public string Note { get; set; }

        public Magazine Magazine;
        public Student Student;
    }
}
