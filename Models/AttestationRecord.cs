using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class AttestationRecord : BaseEntity
    {
        public AttestationRecord()
        {
            this.Statistics = new HashSet<Statistics>();
        }

        public int GroupId { get; set; }
        public int AttestationId { get; set; }

        public DateTime Date { get; set; }
        public string ContingentOfStudents { get; set; }
        public string AverageScore { get; set; }

        public Group Group;
        public Attestation Attestation;

        public ICollection<Statistics> Statistics;
    }
}
