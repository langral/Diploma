using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DBRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;
using WebApp.Infrastructure.Extenstions;
using WebApp.Models;
using WebApp.Models.SpecialViewModels;
using WebApp.Models.ViewModels;

namespace WebApp.Controllersуу
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Magazine")]
    public class MagazineController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Comment> commentRepository;
        private IGenericRepository<Record> recordsRepository;
        private IGenericRepository<Magazine> magazineRepository;
        private IGenericRepository<Student> studentRepository;
        private IGenericRepository<Subject> subjectRepository;
        private IEagerGenericRepository<Group> groupRepository;
        private IEagerGenericRepository<Magazine> magazineRepositoryEager;
        private int defaultPageSize = 5;
        private readonly string userId;
        private readonly MagazineContext magazineContext;

        public MagazineController(IRepositoryFacade repositoryFacade, IHttpContextAccessor httpContextAccessor, MagazineContext magazineContext)
        {
            this.repositoryFacade = repositoryFacade;
            magazineRepository = this.repositoryFacade.CreateEagerGenericRepository<Magazine>();
            magazineRepositoryEager = this.repositoryFacade.CreateEagerGenericRepository<Magazine>() as IEagerGenericRepository<Magazine>;
            subjectRepository = this.repositoryFacade.CreateGenericRepository<Subject>();
            groupRepository = this.repositoryFacade.CreateEagerGenericRepository<Group>() as IEagerGenericRepository<Group>;
            recordsRepository = this.repositoryFacade.CreateGenericRepository<Record>();
            this.userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            this.magazineContext = magazineContext;
            commentRepository = this.repositoryFacade.CreateGenericRepository<Comment>();
            studentRepository = this.repositoryFacade.CreateGenericRepository<Student>();
        }

        [HttpGet]
        [Route("get-magazine-by-id/{id}")]
        public async Task<Magazine> GetRecordById(int? id)
        {
            try
            {
                var magazine = await magazineRepository.Get(id.Value);

                if (magazine == null) throw new NullReferenceException();

                var subject = subjectRepository.Get(magazine.SubjectId).GetAwaiter().GetResult();
                var group = groupRepository.GetEager(magazine.GroupId, "Student").GetAwaiter().GetResult();
              

                magazine.Group = group;
                magazine.Subject = subject;


                foreach(var student in group.Student){
                    var records = recordsRepository.Get(r => r.StudentId == student.Id && r.MagazineId == magazine.Id).OrderBy(x => x.Date);
                    student.Record = records.Select(r => new Record() {
                        Date = r.Date,
                        MagazineId = r.MagazineId,
                        Visit = r.Visit,
                        Id = r.Id,
                        StudentId = r.StudentId,
                    }).ToList();

                    var comments = commentRepository.Get(r => r.StudentId == student.Id && r.MagazineId == magazine.Id);

                    student.Comment = comments.Select(r => new Comment()
                    {
                        MagazineId = r.MagazineId,
                        Note = r.Note,
                        Id = r.Id,
                        StudentId = r.StudentId,
                    }).ToList();
                }
  

                return magazine;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("get-attendences")]
        public async Task<PageInfo<Magazine>> GetRecords(int? page)
        {
            int currentPage = page ?? 1;

            try
            {
            
                var magazines = magazineRepository.Get(r => r.TeacherId == userId);
                foreach(var mag  in magazines)
                {
                    var subject = await subjectRepository.Get(mag.SubjectId);
                    var group = await groupRepository.GetEager(mag.GroupId, "Student");

                    mag.Group = group;
                    mag.Subject = subject;
                }

                PageInfo <Magazine> p = new PageInfo<Magazine>()
                {
                    CurrentPage = currentPage,
                    TotalElements = (int)Math.Ceiling(magazines.Count() / (double)defaultPageSize),
                    Records = magazines.OrderBy(x => x.Id).Skip((currentPage - 1) * defaultPageSize).Take(defaultPageSize)
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpPost]
        [Route("create-records")]
        public async Task CreateRecords([FromBody] RecordsViewModel magazine)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var date = DateTime.Parse(magazine.records.First().Date);

                    var exist = recordsRepository.Get(r => r.MagazineId == magazine.MagazineId && r.Date == date).FirstOrDefault();
                    if (exist != null) throw new Exception(String.Format("Для даты {0} уже существуют записи!", date.ToShortDateString()));

                    foreach (var record in magazine.records)
                    {
                        Record newRecord = new Record()
                        {
                            Date = DateTime.Parse(record.Date),
                            MagazineId = magazine.MagazineId,
                            StudentId = record.studentId,
                            Visit = record.Note
                        };

                        await recordsRepository.Insert(newRecord);
                    }

                    var answer = new
                    {
                        success = String.Format("Запись успешно создана!")
                    };

                    Response.StatusCode = StatusCodes.Status200OK;
                    await Response.WriteAsync(ConvertToJson(answer));
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("error", e.Message);
                    await Response.BadRequestHelper(ModelState.Values);
                }
                
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }

            
        }

        [HttpPost]
        [Route("create-comments")]
        public async Task CreateComments([FromBody] RecordsViewModel magazine)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    foreach (var record in magazine.records)
                    {
                        var exist = commentRepository.Get(r => r.MagazineId == magazine.MagazineId && r.StudentId == record.studentId).FirstOrDefault();

                        Comment newComment = new Comment()
                        {
                            MagazineId = magazine.MagazineId,
                            StudentId = record.studentId,
                            Note = record.Note,
                        };

                        if(exist != null)
                        {
                            exist.Note = newComment.Note;
                            await commentRepository.Update(exist);
                        }
                        else
                        {
                            await commentRepository.Insert(newComment);
                        }
                       
                    }

                    var answer = new
                    {
                        success = String.Format("Примечание успешно создано!")
                    };

                    Response.StatusCode = StatusCodes.Status200OK;
                    await Response.WriteAsync(ConvertToJson(answer));
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("error", e.Message);
                    await Response.BadRequestHelper(ModelState.Values);
                }

            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }


        }

        [HttpPost]
        [Route("create-magazine")]
        public async Task CreateMagazineAsync([FromBody] MagazineViewModel magazine)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var subject = await subjectRepository.Get(magazine.SubjectId);
                    if (subject == null)
                        throw new Exception("Subject is not found");

                    Magazine newMagazine = new Magazine()
                    {
                        GroupId = magazine.GroupId,
                        CourseId = magazine.CourseId,
                        TeacherId = magazine.TeacherId,
                        SubjectId = magazine.SubjectId,
                        Semester = magazine.Semester,
                        Year = magazine.Year,
                        Filial = magazine.Filial,
                        Faculty = magazine.Faculty,
                        Specialty = magazine.Specialty,
                        Level = magazine.Level,
                        TypeOfClass = magazine.TypeOfClass
                    };
                    await magazineRepository.Insert(newMagazine);

                    Response.StatusCode = StatusCodes.Status200OK;
                    await Response.WriteAsync("Ok");
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("error", e.Message);
                    await Response.BadRequestHelper(ModelState.Values);
                }
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        [HttpDelete("{id}")]
        public async Task DeleteMagazineAsync(int id)
        {
            try
            {
                await magazineRepository.Delete(id);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        [HttpPut]
        public async Task UpdateMagazineAsync([FromBody] MagazineIdViewModel magazine)
        {
            if (ModelState.IsValid)
            {
                var newMagazine = await magazineRepository.Get(magazine.Id);

                if (newMagazine == null)
                    throw new Exception("Record is not found");

                newMagazine.TeacherId = magazine.TeacherId;
                newMagazine.SubjectId = magazine.SubjectId;
                newMagazine.Semester = magazine.Semester;
                newMagazine.Year = magazine.Year;
                newMagazine.Filial = magazine.Filial;
                newMagazine.Faculty = magazine.Faculty;
                newMagazine.Level = magazine.Level;
                newMagazine.TypeOfClass = magazine.TypeOfClass;

                await magazineRepository.Update(newMagazine);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        [HttpGet("{id}")]
        public async Task UpdateMagazineAsync(int id)
        {
            try
            {
                var magazine = await magazineRepository.Get(id);

                if (magazine == null)
                    throw new Exception("Record is not found");

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(ConvertToJson(magazine));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        private List<StudentExport> GetStudentsToExport(List<Student> students, int magazineId)
        {
            List<StudentExport> studentExports = new List<StudentExport>();

            foreach(var student in students)
            {
                StudentExport studentExport = new StudentExport()
                {
                    FIO = student.Name,
                    Note = "test", //TO DO
                    Records = recordsRepository.Get(r => r.MagazineId == magazineId && r.StudentId == student.Id)
                                               .Select(r => new RecordExport() { Date = r.Date.ToShortDateString(), Note = r.Visit })
                                               .ToList()
                };

                studentExports.Add(studentExport);
            }

            return studentExports;
        }

        [HttpGet]
        [Route("get-magazine-as-json/{id}")]
        public async Task<MagazineExport> GetMagazineAsAJson(int id)
        {
            try
            {
                var magzine = await magazineRepository.Get(id);

                if (magzine == null) throw new Exception(String.Format("Учет посещаемости не существует!"));

                var magazinesSubject = await subjectRepository.Get(magzine.SubjectId);
                var teacher = magazineContext.Teacher.Where(t => t.Id == magzine.TeacherId).First();

                if (teacher == null) throw new Exception(String.Format("Преподаватель не существует!"));

                var group = groupRepository.GetEager(g => g.Id == magzine.GroupId, "Course").First();

                var students = studentRepository.Get(s => s.GroupId == group.Id).ToList();

                List<StudentExport> studentExports = GetStudentsToExport(students, magzine.Id);

                MagazineExport result = new MagazineExport()
                {
                    Branch = magzine.Filial,
                    Semester = magzine.Semester.ToString(),
                    Speciality = magzine.Specialty,
                    Subject = magazinesSubject.Name,
                    Teacher = teacher.FIO,
                    Department = magzine.Faculty,
                    Level = magzine.Level,
                    Year = Int32.Parse(magzine.Year),
                    Course = group.Course.Number,
                    Group = group.Number,
                    Students = studentExports,
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

        private string ConvertToJson(object data)
        {
            return JsonConvert.SerializeObject(data,
                        new JsonSerializerSettings { Formatting = Formatting.Indented });
        }

    }
}