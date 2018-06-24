using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.SpecialViewModels
{
    public class MagazineExport
    {
        public string Semester { get; set; }
        public int Year { get; set; }
        public string Branch { get; set; }
        public string Department { get; set; }
        public string Level { get; set; }
        public string Speciality { get; set; }
        public string Subject { get; set; }
        public string Teacher { get; set; }
        public int Course { get; set; }
        public int Group { get; set; }
        public List<StudentExport> Students { get; set; }
    }

    public class RecordExport
    {
        public string Date { get; set; }
        public string Note { get; set; }
    }

    public class StudentExport
    {
        public string FIO { get; set; }
        public List<RecordExport> Records { get; set; }
        public string Note { get; set; }
    }
}
