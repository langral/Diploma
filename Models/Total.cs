using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Total : BaseEntity
    {
        public Total()
        {
            this.Statistics = new HashSet<Statistics>();
        }

        public int AttestationId { get; set; }

        public Attestation Attestation; 

        public ICollection<Statistics> Statistics;
    }
}
