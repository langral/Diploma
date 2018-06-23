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
using Newtonsoft.Json;
using WebApp.Infrastructure.Extenstions;
using WebApp.Models;
using WebApp.Models.ViewModels;

namespace WebApp.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Group")]
    public class GroupController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Group> groupRepository;
        private IGenericRepository<Course> courseRepository;
        private IGenericRepository<Subject> subjectRepository;
        private IEagerGenericRepository<GroupTeacherMappingModel> GroupTeacherMappingModelRepository;
        private IGenericRepository<GroupSubjectMappingModel> GroupSubjectMappingModelRepository;
        private int defaultPageSize = 5;
        private readonly string userId;

        public GroupController(IRepositoryFacade repositoryFacade, IHttpContextAccessor httpContextAccessor)
        {
            this.repositoryFacade = repositoryFacade;
            groupRepository = this.repositoryFacade.CreateGenericRepository<Group>();
            courseRepository = this.repositoryFacade.CreateGenericRepository<Course>();
            subjectRepository = this.repositoryFacade.CreateGenericRepository<Subject>();
            GroupSubjectMappingModelRepository = this.repositoryFacade.CreateGenericRepository<GroupSubjectMappingModel>();
            GroupTeacherMappingModelRepository = this.repositoryFacade.CreateEagerGenericRepository<GroupTeacherMappingModel>() as IEagerGenericRepository<GroupTeacherMappingModel>;
            this.userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpPost]
        [Route("get-by-subjects")]
        public PageInfo<Group> GetGroupsBySubjects([FromBody] List<Subject> subjects)
        {

            try
            {
                int? page = null;
                var groupSubjectRecords = GroupSubjectMappingModelRepository.Get(gsr => subjects.SingleOrDefault(s => s.Id == gsr.SubjectId) != null)
                                          .Distinct().Select(x => x.GroupId).Distinct().ToList();

                var groups = groupRepository.Get(g => groupSubjectRecords.SingleOrDefault(gsr => g.Id == gsr.Value) != null);


                PageInfo<Group> p = new PageInfo<Group>()
                {
                    CurrentPage = page,
                    TotalElements = (int)Math.Ceiling(groups.Count() / (double)defaultPageSize),
                    Records = (page != null) ? groups.OrderBy(x => x.Id).Skip((page.Value - 1) * defaultPageSize).Take(defaultPageSize) : groups,
                    PageSize = defaultPageSize
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpGet]
        public PageInfo<Group> GetGroups(int? page)
        {
            // int currentPage = page ?? 1;

            try
            {
                var groups = groupRepository.GetAll();

                PageInfo<Group> p = new PageInfo<Group>()
                {
                    CurrentPage = page,
                    TotalElements = (int)Math.Ceiling(groups.Count() / (double)defaultPageSize),
                    Records = (page != null) ? groups.OrderBy(x => x.Id).Skip((page.Value - 1) * defaultPageSize).Take(defaultPageSize) : groups,
                    PageSize = defaultPageSize
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("get-groups-for-teacher")]
        public PageInfo<Group> GetGroupsForTeacherId()
        {
            try
            {
                int? page = null;

                var subjects = subjectRepository.GetAll();
                var mappingRecordsGT = GroupTeacherMappingModelRepository.GetEager(r => r.TeacherId == this.userId, "Group").Select( r => new { id = r.GroupId, number = r.Group.Number });
                var mappingRecordsGS = GroupSubjectMappingModelRepository.Get(r => mappingRecordsGT.SingleOrDefault(s => s.id == r.GroupId) != null)
                                                                         .Select(r => new { r.GroupId, subject = subjects.FirstOrDefault(s => s.Id == r.SubjectId)})
                                                                         .GroupBy(r => r.GroupId).ToList();

              /*  var nRecords = GroupSubjectMappingModelRepository.Get(r => mappingRecordsGT.SingleOrDefault(s => s.id == r.GroupId) != null)
                                                                 .Select(r => new { r.GroupId, r.Group.Number, subject = subjects.FirstOrDefault(s => s.Id == r.SubjectId) }).GroupBy(r => r.GroupId);
*/
                List<Group> records = new List<Group>();

                foreach (var record in mappingRecordsGS)
                {
                    var number = groupRepository.Get(record.Key.Value);
                    var awaiter = number.GetAwaiter();
                    var group = new Group()
                    {
                        Number = awaiter.GetResult().Number,

                    };

                    foreach (var tmp in record)
                    {
                        group.Subject.Add(new Subject() { Name = tmp.subject.Name });
                    }
                    records.Add(group);
                }
                var nRecords = records.AsQueryable();

                PageInfo<Group> p = new PageInfo<Group>()
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
        public async Task CreateGroupAsync([FromBody] GroupViewModel group)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var exists = groupRepository.Get(r => r.Number == group.Number).SingleOrDefault();
                    if ((exists != null) && (exists.CourseId == group.CourseId))
                        throw new Exception(String.Format("Группа номер {0} уже существует на этом курсе!", exists.Number));

                    var course = await courseRepository.Get(group.CourseId);
                    if (course == null)
                        throw new Exception("Группа не найдена!"); 

                    Group newGroup = new Group()
                    {
                        Number = group.Number.Value,
                        CourseId = group.CourseId
                    };

                    await groupRepository.Insert(newGroup);

                    if ((group.Subject != null) && (group.Subject.Count() > 0))
                    {
                        foreach(var sb in group.Subject)
                        {
                            var tmpSb = await subjectRepository.Get(sb.Id);
                            if (tmpSb != null)
                            {
                                GroupSubjectMappingModel newGroupSubject = new GroupSubjectMappingModel()
                                {
                                    GroupId = newGroup.Id,
                                    SubjectId = sb.Id
                                };

                                await GroupSubjectMappingModelRepository.Insert(newGroupSubject);
                            }
                        }
                    }

                    string msg = String.Format("Группа '{0}' успешно создана!", newGroup.Number);
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

        [HttpDelete]
        public async Task DeleteGroupAsync(int id)
        {
            try
            {
                await groupRepository.Delete(id);

                string msg = String.Format("Группа была удалена!");
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
        public async Task UpdateGroupAsync([FromBody] GroupIdViewModel group)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newGroup = await groupRepository.Get(group.Id);

                    if (newGroup == null)
                        throw new Exception("Группа не найдена!");

                    newGroup.Number = group.Number.Value;
                    newGroup.CourseId = group.CourseId;

                    await groupRepository.Update(newGroup);

                    var records = GroupSubjectMappingModelRepository.Get(r => r.GroupId == newGroup.Id).ToList();

                    if(records != null && records.Count() > 0)
                        foreach(var record in records)
                        {
                            await GroupSubjectMappingModelRepository.Delete(record);
                        }

                    if(group.Subject != null && group.Subject.Count() > 0)
                        foreach(var subject in group.Subject)
                        {
                            var tmpSb = await subjectRepository.Get(subject.Id);
                            if (tmpSb != null)
                            {
                                GroupSubjectMappingModel newGroupSubject = new GroupSubjectMappingModel()
                                {
                                    GroupId = newGroup.Id,
                                    SubjectId = subject.Id
                                };

                                await GroupSubjectMappingModelRepository.Insert(newGroupSubject);
                            }
                        }

                    string msg = String.Format("Группа '{0}' успешно изменена!", newGroup.Number);
                    Response.StatusCode = StatusCodes.Status200OK;
                    await Response.WriteAsync(JsonConvert.SerializeObject(new { success = msg },
                                new JsonSerializerSettings { Formatting = Formatting.Indented }));
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("error", e.Message);
                    await Response.BadRequestHelper(ModelState.Values);
                }               

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        [HttpGet("{id}")]
        public async Task UpdateGroupAsync(int id)
        {
            try
            {
                var group = await groupRepository.Get(id);

                if (group == null)
                    throw new Exception("Группа не найдена!");

                var subjectList = GroupSubjectMappingModelRepository.Get(r => r.GroupId == group.Id);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(new { group, subjectList },
                    new JsonSerializerSettings { Formatting = Formatting.Indented }));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        [HttpGet]
        [Route("groups-for-teacher/{course}")]
        public async Task<RevordViewModel<Group>> GetAllGroupsForTeacher(int? course)
        {
            try
            {
                var groupsTeacher = GroupTeacherMappingModelRepository.GetEager(x => x.TeacherId == userId, "Teacher").Distinct();
                var groups = groupRepository.Get(g => g.CourseId == course.Value && groupsTeacher.SingleOrDefault(t => t.GroupId == g.Id) != null);

                var result = new RevordViewModel<Group>() { Records = groups.ToList() };

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
