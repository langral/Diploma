using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.ViewModels
{
    public class AttestationRecordViewModel
    {
        public int GroupId { get; set; }
        public string Date { get; set; }
        public int AttestationId { get; set; }
        public string ContingentOfStudents { get; set; }


        public List<MarkViewModel> Marks { get; set; }
    }
}
