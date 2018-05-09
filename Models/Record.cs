using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Record : BaseEntity
    {
        public int MagazineId { get; set; }

        public Magazine Magazine;
        public Student Student;
    }
}
