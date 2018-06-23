using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Mark : BaseEntity
    {
        public string mark { get; set; }

        public int? StudentId { get; set; }
        public Student Student { get; set; }

        public int AttestationRecordId { get; set; }
        public AttestationRecord AttestationRecord { get; set; }
    }
}
