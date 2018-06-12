using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Attestation : BaseEntity
    {
        public Attestation()
        {
            this.AttestationRecord = new HashSet<AttestationRecord>();
        }

        public int Semester { get; set; }
        public int Year { get; set; }
        public string Department { get; set; }

        public int SubjectId { get; set; }
        public int TeacherId { get; set; }

        public Subject Subject;
        public Teacher Teacher;
        public Total Total;

        public ICollection<AttestationRecord> AttestationRecord;
    }
}
