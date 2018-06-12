using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Subject : BaseEntity
    {
        public Subject()
        {
            this.Magazine = new HashSet<Magazine>();
            this.Teacher = new HashSet<Teacher>();
            this.Group = new HashSet<Group>();
            this.Attestation = new HashSet<Attestation>();
        }

        public string Name { get; set; }

        public ICollection<Magazine> Magazine;
        public ICollection<Teacher> Teacher;
        public ICollection<Group> Group;
        public ICollection<Attestation> Attestation;
    }
}
