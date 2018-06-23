using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Record : BaseEntity
    {
        public int MagazineId { get; set; }
        public int? StudentId { get; set; }

        public string Visit { get; set; }
        public DateTime Date { get; set; }

        public Magazine Magazine { get; set; }
        public Student Student { get; set; }
    }
}
