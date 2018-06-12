using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Statistics : BaseEntity
    {
        public int TotalId { get; set; }
        public int AttestationRecordId { get; set; }

        public string Title { get; set; }
        public int Absolute { get; set; }
        public int Percentage { get; set; }

        public Total Total;
        public AttestationRecord AttestationRecord;
    }
}
