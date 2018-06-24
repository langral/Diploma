using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DBRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using WebApp.Infrastructure.Extenstions;
using WebApp.Models;
using WebApp.Models.SpecialViewModels;
using WebApp.Models.ViewModels;

namespace WebApp.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Attestation")]
    public class AttestationController : Controller
    {
        private readonly IGenericRepository<Attestation> attestationRepository;
        private IGenericRepository<Group> groupRepository;
        private IEagerGenericRepository<GroupSubjectMappingModel> groupSubjetcRepository;
        private IGenericRepository<GroupTeacherMappingModel> groupTeacherRepository;
        private IEagerGenericRepository<Group> eagerGroupRepository;
        private IEagerGenericRepository<Attestation> eagerAttestationRepository;
        private readonly string userId;
        private int defaultPageSize = 5;
        private IGenericRepository<Subject> subjectRepository;
        private IGenericRepository<Mark> markRepository;
        private IGenericRepository<Student> studentRepository;
        private IGenericRepository<AttestationRecord> attestationRecordRepository;
        private IEagerGenericRepository<Mark> eagerMarkRepository;

        private readonly MagazineContext magazineContext;

        public AttestationController(IHttpContextAccessor httpContextAccessor, IRepositoryFacade repositoryFacade, MagazineContext magazineContext)
        {
            this.userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            this.attestationRepository = repositoryFacade.CreateGenericRepository<Attestation>();
            eagerGroupRepository =  repositoryFacade.CreateEagerGenericRepository<Group>() as IEagerGenericRepository<Group>;
            eagerAttestationRepository = repositoryFacade.CreateEagerGenericRepository<Attestation>() as IEagerGenericRepository<Attestation>;
            groupRepository = repositoryFacade.CreateGenericRepository<Group>();
            markRepository = repositoryFacade.CreateGenericRepository<Mark>();
            subjectRepository = repositoryFacade.CreateGenericRepository<Subject>();
            groupSubjetcRepository = repositoryFacade.CreateEagerGenericRepository<GroupSubjectMappingModel>() as IEagerGenericRepository<GroupSubjectMappingModel>;
            groupTeacherRepository = repositoryFacade.CreateGenericRepository<GroupTeacherMappingModel>();
            studentRepository = repositoryFacade.CreateGenericRepository<Student>();
            attestationRecordRepository = repositoryFacade.CreateGenericRepository<AttestationRecord>();
            eagerMarkRepository = repositoryFacade.CreateEagerGenericRepository<Mark>() as IEagerGenericRepository<Mark>;
            this.magazineContext = magazineContext;
        }


        [HttpPost]
        [Route("create-attestation")]
        public async Task CreateAttestation([FromBody] AttestationViewModel model)
        {
            if (ModelState.IsValid)
            {
                var attestation = new Attestation()
                {
                    Department = model.Department,
                    Semester = model.Semester,
                    Speciality = model.Specialty,
                    Year = model.Year,
                    SubjectId = model.SubjectId,
                    TeacherId = userId,
                };

                await attestationRepository.Insert(attestation);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }
        }


        [HttpGet]
        [Route("get-attestations")]
        public PageInfo<Attestation> GetRecords(int? page)
        {
            int currentPage = page ?? 1;

            try
            {

                var attestations = attestationRepository.Get(r => r.TeacherId == userId);


                foreach (var att in attestations)
                {
                    var subject =  subjectRepository.Get(att.SubjectId).GetAwaiter().GetResult();
                    att.Subject = subject;
                }




                PageInfo<Attestation> p = new PageInfo<Attestation>()
                {
                    CurrentPage = currentPage,
                    TotalElements = (int)Math.Ceiling(attestations.Count() / (double)defaultPageSize),
                    Records = attestations.OrderBy(x => x.Id).Skip((currentPage - 1) * defaultPageSize).Take(defaultPageSize)
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("get-groups-by-subject/{id}")]
        public RevordViewModel<Group> GetGroupsBySubject(int? id)
        {

            try
            {
                var grtrecords = groupTeacherRepository.Get(t => t.TeacherId == userId).Distinct();
                var grsbrecords = groupSubjetcRepository.GetEager(g => g.SubjectId == id.Value, "Group").Distinct()
                                                        .Where(gr => grtrecords.SingleOrDefault(rt => rt.GroupId == gr.GroupId) != null);

                var result = new RevordViewModel<Group>()
                {
                    Records = grsbrecords.Select(x => x.Group).ToList()
                };

                foreach(var gr in result.Records)
                {
                    gr.Student = studentRepository.Get(x => x.GroupId == gr.Id).ToList();
                }

                return result;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("get-attestation-by-id/{id}")]
        public async Task<AttRespViewModel> GetAttestationById(int? id)
        {

            try
            {

                var attestation = await eagerAttestationRepository.GetEager(id.Value, "AttestationRecord");
               
                if (attestation == null) throw new NullReferenceException();

                var subject = await subjectRepository.Get(attestation.SubjectId);
     

            
                attestation.Subject = subject;

                AttRespViewModel res = new AttRespViewModel()
                {
                    Department = attestation.Department,
                    Semester = attestation.Semester,
                    Speciality = attestation.Speciality,
                    Subject = attestation.Subject.Name,
                    SubjectId = attestation.Subject.Id,
                    Year = attestation.Year,
                };



                return res;
            }
            catch (Exception e)
            {
                return null;
            }
        }


        [HttpPost]
        [Route("create-attestation-record")]
        public async Task CreateAttestationRecord([FromBody] AttestationRecordViewModel atr)
        {
            if (ModelState.IsValid)
            {

                var attestationRecord = new AttestationRecord()
                {
                    AttestationId = atr.AttestationId,
                    ContingentOfStudents = atr.ContingentOfStudents,
                    GroupId = atr.GroupId,
                    Date = DateTime.Parse(atr.Date),
                };


                await attestationRecordRepository.Insert(attestationRecord);

                foreach(var mk in atr.Marks)
                {
                    Mark m = new Mark()
                    {
                        StudentId = mk.StudentId,
                        mark = mk.note,
                        AttestationRecordId = attestationRecord.Id
                    };

                    await markRepository.Insert(m);
                }

            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }

            Response.StatusCode = StatusCodes.Status200OK;
            await Response.WriteAsync("Ok");
        }

        [HttpGet]
        [Route("get-attestation-records/{id}")]
        public  RevordViewModel<ATRResponseViewModel> GetAttestationRecords(int id)
        {

            try
            {
                var attRecs = attestationRecordRepository.Get(x => x.AttestationId == id).ToList();

                List<ATRResponseViewModel> list = new List<ATRResponseViewModel>();

                foreach(var rec in attRecs)
                {
                    var group = eagerGroupRepository.GetEager(rec.GroupId, "Course").GetAwaiter().GetResult();
                    var l = new ATRResponseViewModel()
                    {
                        id = rec.Id,
                        Date = rec.Date,
                        Course = group.Course.Number,
                        Group = group.Number
                    };
                    list.Add(l);
                }

                var result = new RevordViewModel<ATRResponseViewModel>()
                {
                    Records = list
                };
               

                return result;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        private async Task<List<AttestationRecordExport>> GetAttestationRecordsToExport(List<AttestationRecord> attestationRecords)
        {
            List<AttestationRecordExport> attestationRecordsExport = new List<AttestationRecordExport>();

            foreach (var record in attestationRecords) { 

                var group = await eagerGroupRepository.GetEager(record.GroupId, "Course");
                var marks = eagerMarkRepository.GetEager(x => x.AttestationRecordId == record.Id, "Student");
                                               

                AttestationRecordExport attRExp = new AttestationRecordExport()
                {
                    group = group.Number,
                    course = group.Course.Number,
                    contingentOfStudents = record.ContingentOfStudents,
                    date = record.Date.ToShortDateString(),
                    marks = marks.Select(x => new MarkExport() { FIO = x.Student.Name, mark = Int32.Parse(x.mark) }).ToList()
            };

                attestationRecordsExport.Add(attRExp);
            }

            return attestationRecordsExport;
        }

        [HttpGet]
        [Route("get-attestation-as-json/{id}")]
        public async Task<AttestationExport> GetAttestationAsAJson(int id)
        {
            try
            {
                var attestation = await attestationRepository.Get(id);

                if (attestation == null) throw new Exception(String.Format("Аттестации не существует!"));

                var attestationSubject = await subjectRepository.Get(attestation.SubjectId);

                var teacher = magazineContext.Teacher.Where(t => t.Id == attestation.TeacherId).First();

                if (teacher == null) throw new Exception(String.Format("Преподаватель не существует!"));

                var attestationRecords = attestationRecordRepository.Get(s => s.AttestationId == attestation.Id).ToList();

                List<AttestationRecordExport> attestationRecordsExport = await GetAttestationRecordsToExport(attestationRecords);

                AttestationExport result = new AttestationExport()
                {
                    Semester = attestation.Semester.ToString(),
                    Department = attestation.Department,
                    Speciality = attestation.Speciality,
                    Subject = attestationSubject.Name,
                    Teacher = teacher.FIO,
                    Year = attestation.Year,
                    attestationRecords = attestationRecordsExport
                };

                return result;
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }


            return null;
        }

    }


}
