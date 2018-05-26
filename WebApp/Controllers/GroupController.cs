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
    [Route("api/Group")]
    public class GroupController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Group> groupRepository;
        private IGenericRepository<Course> courseRepository;
        private IGenericRepository<Subject> subjectRepository;
        private IGenericRepository<GroupSubjectMappingModel> GroupSubjectMappingModelRepository;
        private int defaultPageSize = 5;

        public GroupController(IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
            groupRepository = this.repositoryFacade.CreateGenericRepository<Group>();
            courseRepository = this.repositoryFacade.CreateGenericRepository<Course>();
            subjectRepository = this.repositoryFacade.CreateGenericRepository<Subject>();
            GroupSubjectMappingModelRepository = this.repositoryFacade.CreateGenericRepository<GroupSubjectMappingModel>();
        }


        [HttpGet]
        public PageInfo<Group> GetGroups(int? page)
        {
            int currentPage = page ?? 1;

            try
            {
                var courses = groupRepository.GetAll();

                PageInfo<Group> p = new PageInfo<Group>()
                {
                    CurrentPage = currentPage,
                    TotalElements = (int)Math.Ceiling(courses.Count() / (double)defaultPageSize),
                    Records = courses.OrderBy(x => x.Id).Skip((currentPage - 1) * defaultPageSize).Take(defaultPageSize)
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
                    var course = await courseRepository.Get(group.CourseId);
                    if (course == null)
                        throw new Exception("Group is not found");

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
                            var tmpSb = subjectRepository.Get(sb.Id);
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
        public async Task DeleteGroupAsync(int id)
        {
            try
            {
                await groupRepository.Delete(id);

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
        public async Task UpdateGroupAsync([FromBody] GroupIdViewModel group)
        {
            if (ModelState.IsValid)
            {
                var newGroup = await groupRepository.Get(group.Id);

                if (newGroup == null)
                    throw new Exception("Group is not found");

                newGroup.Number = group.Number.Value;
                newGroup.CourseId = group.CourseId;

                await groupRepository.Update(newGroup);

                

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
                    throw new Exception("Group is not found");

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(group,
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