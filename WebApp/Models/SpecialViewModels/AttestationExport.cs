using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.SpecialViewModels
{
    public class AttestationExport
    {
        public string Semester { get; set; }
        public int Year { get; set; }
        public string Department { get; set; }
        public string Speciality { get; set; }
        public string Subject { get; set; }
        public string Teacher { get; set; }
        public List<AttestationRecordExport> attestationRecords { get; set; }
    }

    public class MarkExport
    {
        public string FIO { get; set; }
        public int mark { get; set; }
    }

    public class AttestationRecordExport
    {
        public int course { get; set; }
        public int group { get; set; }
        public string date { get; set; }
        public string contingentOfStudents { get; set; }
        public List<MarkExport> marks { get; set; }
    }
}

