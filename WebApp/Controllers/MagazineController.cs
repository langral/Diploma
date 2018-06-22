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
using WebApp.Models.ViewModels;

namespace WebApp.Controllersуу
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Magazine")]
    public class MagazineController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Record> recordsRepository;
        private IGenericRepository<Magazine> magazineRepository;
        private IGenericRepository<Subject> subjectRepository;
        private IEagerGenericRepository<Group> groupRepository;
        private IEagerGenericRepository<Magazine> magazineRepositoryEager;
        private int defaultPageSize = 5;
        private readonly string userId;

        public MagazineController(IRepositoryFacade repositoryFacade, IHttpContextAccessor httpContextAccessor)
        {
            this.repositoryFacade = repositoryFacade;
            magazineRepository = this.repositoryFacade.CreateEagerGenericRepository<Magazine>();
            magazineRepositoryEager = this.repositoryFacade.CreateEagerGenericRepository<Magazine>() as IEagerGenericRepository<Magazine>;
            subjectRepository = this.repositoryFacade.CreateGenericRepository<Subject>();
            groupRepository = this.repositoryFacade.CreateEagerGenericRepository<Group>() as IEagerGenericRepository<Group>;
            recordsRepository = this.repositoryFacade.CreateGenericRepository<Record>();
            this.userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
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
                    student.Record = records.ToList();
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
        public PageInfo<Magazine> GetRecords(int? page)
        {
            int currentPage = page ?? 1;

            try
            {
            
                var magazines = magazineRepository.Get(r => r.TeacherId == userId);
                foreach(var mag  in magazines)
                {
                    var subject = subjectRepository.Get(mag.SubjectId).GetAwaiter().GetResult();
                    var group = groupRepository.GetEager(mag.SubjectId, "Student").GetAwaiter().GetResult();

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
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }

            Response.StatusCode = StatusCodes.Status200OK;
            await Response.WriteAsync("Ok");
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
                await Response.WriteAsync(JsonConvert.SerializeObject(magazine,
                    new JsonSerializerSettings { Formatting = Formatting.Indented }));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

    }
}