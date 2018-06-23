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
        public string Speciality { get; set; }

        public int SubjectId { get; set; }
        public string TeacherId { get; set; }


       
        public Subject Subject { get; set; }
        public Teacher Teacher { get; set; }

        public ICollection<AttestationRecord> AttestationRecord { get; set; }
    }
}
