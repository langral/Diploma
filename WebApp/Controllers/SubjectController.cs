using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;
using WebApp.Infrastructure.Extenstions;
using WebApp.Models;
using WebApp.Models.ViewModels;

namespace WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Subject")]
    public class SubjectController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Subject> subjectRepository;
        private IGenericRepository<Group> groupRepository;
        private IEagerGenericRepository<TeacherSubjectMappingModel> TeacherSubjectMappingModelRepository;
        private IGenericRepository<GroupSubjectMappingModel> GroupSubjectMappingModelRepository;

        private int defaultPageSize = 5;

        public SubjectController(IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
            groupRepository = this.repositoryFacade.CreateGenericRepository<Group>();
            subjectRepository = this.repositoryFacade.CreateGenericRepository<Subject>();
            GroupSubjectMappingModelRepository = this.repositoryFacade.CreateGenericRepository<GroupSubjectMappingModel>();
            TeacherSubjectMappingModelRepository = this.repositoryFacade.CreateEagerGenericRepository<TeacherSubjectMappingModel>() as IEagerGenericRepository<TeacherSubjectMappingModel>;
        }


        [HttpGet]
        public PageInfo<Subject> GetSubjects(int? page)
        {
            //int currentPage = page ?? 1;

            try
            {
                var subjects = subjectRepository.GetAll();

                PageInfo<Subject> p = new PageInfo<Subject>()
                {
                    CurrentPage = page,
                    TotalElements = (int)Math.Ceiling(subjects.Count() / (double)defaultPageSize),
                    Records = (page != null) ? subjects.OrderBy(x => x.Id).Skip((page.Value - 1) * defaultPageSize).Take(defaultPageSize) : subjects,
                    PageSize = defaultPageSize
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpGet("{page}/{idTeacher}")]
        public PageInfo<Subject> GetSubjectsForTeacherId(int? page, int idTeacher)
        {
            try
            {
                var groups = groupRepository.GetAll();
                var mappingRecordsTS = TeacherSubjectMappingModelRepository.GetEager(r => r.TeacherId == idTeacher, "Subject").Select(r => new { id = r.SubjectId, number = r.Subject.Name });
                var mappingRecordsGS = GroupSubjectMappingModelRepository.Get(r => mappingRecordsTS.SingleOrDefault(s => s.id == r.SubjectId) != null)
                                                                         .Select(r => new { r.SubjectId, group = groups.FirstOrDefault(s => s.Id == r.GroupId) })
                                                                         .GroupBy(r => r.SubjectId).ToList();

                /*  var nRecords = GroupSubjectMappingModelRepository.Get(r => mappingRecordsGT.SingleOrDefault(s => s.id == r.GroupId) != null)
                                                                   .Select(r => new { r.GroupId, r.Group.Number, subject = subjects.FirstOrDefault(s => s.Id == r.SubjectId) }).GroupBy(r => r.GroupId);
  */
                List<Subject> records = new List<Subject>();

                foreach (var record in mappingRecordsGS)
                {
                    var name = subjectRepository.Get(record.Key.Value);
                    var awaiter = name.GetAwaiter();
                    var subject = new Subject()
                    {
                        Name = awaiter.GetResult().Name,

                    };

                    foreach (var tmp in record)
                    {
                        subject.Group.Add(new Group() { Number = tmp.group.Number });
                    }
                    records.Add(subject);
                }
                var nRecords = records.AsQueryable();

                PageInfo<Subject> p = new PageInfo<Subject>()
                {
                    CurrentPage = page,
                    TotalElements = (int)Math.Ceiling(nRecords.Count() / (double)defaultPageSize),
                    Records = (page != null) ? nRecords.OrderBy(x => x.Id).Skip((page.Value - 1) * defaultPageSize).Take(defaultPageSize) : nRecords,
                    PageSize = defaultPageSize
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpPost]
        public async Task CreateSubjectAsync([FromBody] SubjectViewModel subject)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var exists = subjectRepository.Get(r => r.Name == subject.Name).SingleOrDefault();
                    if (exists != null)
                        throw new Exception("Предмет уже существует!");

                    Subject newSubject = new Subject()
                    {
                        Name = subject.Name
                    };
                    await subjectRepository.Insert(newSubject);

                    string msg = String.Format("Предмет '{0}' успешно создан!", subject.Name);
                    Response.StatusCode = StatusCodes.Status200OK;
                    await Response.WriteAsync(JsonConvert.SerializeObject(new { success = msg },
                                new JsonSerializerSettings { Formatting = Formatting.Indented }));
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

        public async Task DeleteSubjectAsync(int id)
        {
            try
            {
                await subjectRepository.Delete(id);

                string msg = String.Format("Предмет успешно удален!");
                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(new { success = msg },
                                new JsonSerializerSettings { Formatting = Formatting.Indented }));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        [HttpPut]
        public async Task UpdateSubjectAsync([FromBody] SubjectIdViewModel subject)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newSubject = await subjectRepository.Get(subject.Id);

                    if (newSubject == null)
                        throw new Exception("Предмет не найден!");

                    newSubject.Name = subject.Name;

                    await subjectRepository.Update(newSubject);

                    string msg = String.Format("Предмет '{0}' успешно изменен!", subject.Name);
                    Response.StatusCode = StatusCodes.Status200OK;
                    await Response.WriteAsync(JsonConvert.SerializeObject(new { success = msg },
                                new JsonSerializerSettings { Formatting = Formatting.Indented }));
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

        [HttpGet("{id}")]
        public async Task UpdateSubjectAsync(int id)
        {
            try
            {
                var subject = await subjectRepository.Get(id);

                if (subject == null)
                    throw new Exception("Предмет не найден!");

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(subject,
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