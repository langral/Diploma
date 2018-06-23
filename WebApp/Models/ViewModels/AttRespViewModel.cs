using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class AttRespViewModel
    {

        public int Semester { get; set; }
        public int Year { get; set; }
        public string Department { get; set; }
        public string Speciality { get; set; }
        public string Subject { get; set; }
        public int SubjectId { get; set; }

    }
}
