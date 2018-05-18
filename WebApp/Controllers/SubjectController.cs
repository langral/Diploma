using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
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

        private IGenericRepository<Group> groupRepository;
        private IGenericRepository<Subject> subjectRepository;
        private int defaultPageSize = 5;

        public SubjectController(IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
            groupRepository = this.repositoryFacade.CreateGenericRepository<Group>();
            subjectRepository = this.repositoryFacade.CreateGenericRepository<Subject>();
        }


        [HttpGet]
        public PageInfo<Subject> GetSubjects(int? page)
        {
            int currentPage = page ?? 1;

            try
            {
                var subjects = subjectRepository.GetAll();

                PageInfo<Subject> p = new PageInfo<Subject>()
                {
                    CurrentPage = currentPage,
                    TotalElements = (int)Math.Ceiling(subjects.Count() / (double)defaultPageSize),
                    Records = subjects.OrderBy(x => x.Id).Skip((currentPage - 1) * defaultPageSize).Take(defaultPageSize)
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
                    /* int max = groupRepository.GetAll().Count();
                     List<Group> tmp = new List<Group>();
                     for (int i=1; i<= max; i++)
                     {
                        subject.Group
                     }*/
                    

                    Subject newGroup = new Subject()
                    {
                        Name = subject.Name,
                        Group = subject.Group
                    };
                    await subjectRepository.Insert(newGroup);

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

     /*   [HttpDelete("{id}")]
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
                var course = await groupRepository.Get(id);

                if (course == null)
                    throw new Exception("Group is not found");

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(course,
                    new JsonSerializerSettings { Formatting = Formatting.Indented }));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }
        }*/

    }
}