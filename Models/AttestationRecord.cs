using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class AttestationRecord : BaseEntity
    {
        public AttestationRecord()
        {
            this.Marks = new HashSet<Mark>();
        }

        public int GroupId { get; set; }
        public Group Group { get; set; }

        public DateTime Date { get; set; }
        public string ContingentOfStudents { get; set; }


        public int AttestationId { get; set; }
        public Attestation Attestation { get; set; }

        public ICollection<Mark> Marks { get; set; }
    }
}
