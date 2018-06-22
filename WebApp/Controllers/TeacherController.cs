using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;
using WebApp.Infrastructure.Extenstions;
using WebApp.Models;
using WebApp.Models.ViewModels;

namespace WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Teacher")]
    public class TeacherController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;
        private readonly MagazineContext magazineContext;
     
        private IGenericRepository<TeacherSubjectMappingModel> TeacherSubjectMappingModelRepository;
        private IGenericRepository<GroupTeacherMappingModel> GroupTeacherMappingModelRepository;

        private int defaultPageSize = 5;

        public TeacherController(MagazineContext magazineContext, IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
            this.magazineContext = magazineContext;

            TeacherSubjectMappingModelRepository = this.repositoryFacade.CreateGenericRepository<TeacherSubjectMappingModel>();
            GroupTeacherMappingModelRepository = this.repositoryFacade.CreateGenericRepository<GroupTeacherMappingModel>();
        }


        [HttpGet]
        public PageInfo<Teacher> GetTeachers(int? page)
        {
            try
            {
                var teachers = magazineContext.Teacher;

                PageInfo<Teacher> p = new PageInfo<Teacher>()
                {
                    CurrentPage = page,
                    TotalElements = (int)Math.Ceiling(teachers.Count() / (double)defaultPageSize),
                    Records = (page != null) ? teachers.OrderBy(x => x.Id).Skip((page.Value - 1) * defaultPageSize).Take(defaultPageSize) : teachers,
                    PageSize = defaultPageSize
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpDelete]
        public async Task DeleteTeacherAsync(string id)
        {
            try
            {
                magazineContext.Teacher.Remove(magazineContext.Teacher.SingleOrDefault(t => t.Id == id));
                magazineContext.SaveChanges();

                string msg = String.Format("Преподаватель был удален!");
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

        [HttpPost]
        [Route("assing-to-subject")]
        public async Task AssingTeacherToSubjects([FromBody] AssignTeacherToSubjectsViewModel aw)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var teacher = magazineContext.Users.SingleOrDefault(r => r.Id == aw.TeacherId.ToString());
                    if (teacher == null)
                        throw new Exception("Преподаватель не найден!");

                    if ((aw.subjects != null) && (aw.subjects.Count() > 0))
                    {
                        foreach (var sb in aw.subjects)
                        {
                            TeacherSubjectMappingModel newTeacherSubject = new TeacherSubjectMappingModel()
                            {
                                Teacher = teacher as Teacher,
                                SubjectId = sb.Id
                            };

                            await TeacherSubjectMappingModelRepository.Insert(newTeacherSubject);
                        }
                    }

                    string msg = String.Format("успешно!");
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

        [HttpPost]
        [Route("assing-to-groups")]
        public async Task AssingTeacherToGroups([FromBody] AssignTeacherToGroupsViewModel aw)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var teacher = magazineContext.Users.SingleOrDefault(r => r.Id == aw.TeacherId.ToString());
                    if (teacher == null)
                        throw new Exception("Преподаватель не найден!");

                    if ((aw.groups != null) && (aw.groups.Count() > 0))
                    {
                        foreach (var sb in aw.groups)
                        {
                            GroupTeacherMappingModel newTeacherGroup = new GroupTeacherMappingModel()
                            {
                                Teacher = teacher as Teacher,
                                GroupId = sb.Id
                            };

                            await GroupTeacherMappingModelRepository.Insert(newTeacherGroup);
                        }
                    }

                    string msg = String.Format("успешно!");
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

    }
}
