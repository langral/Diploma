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
    [Route("api/Course")]
    public class CourseController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Course> courseRepository;
        private int defaultPageSize = 5;

        public CourseController(IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
            courseRepository = this.repositoryFacade.CreateGenericRepository<Course>();
        }


        [HttpGet]
        public PageInfo<Course> GetCourses(int? page)
        {
            int currentPage = page ?? 1;

            try
            {
                var courses = courseRepository.GetAll();

                PageInfo<Course> p = new PageInfo<Course>()
                {
                    CurrentPage = page,
                    TotalElements = (int)Math.Ceiling(courses.Count() / (double)defaultPageSize),
                    Records = (page != null) ? courses.OrderBy(x => x.Id).Skip((page.Value - 1) * defaultPageSize).Take(defaultPageSize) : courses,
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
        public async Task CreateCourseAsync([FromBody] CourseViewModel course)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var exists = courseRepository.Get(r => r.Number == course.Number).SingleOrDefault();
                    if (exists != null)
                        throw new Exception("Курс уже существует");

                    Course newCourse = new Course()
                    {
                        Number = course.Number.Value
                    };
                    await courseRepository.Insert(newCourse);

                    string msg = String.Format("Курс '{0}' успешно создан!", course.Number);
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

        public async Task DeleteCourseAsync(int id)
        {
            try
            {
                await courseRepository.Delete(id);

                string msg = String.Format("Курс успешно удален!");
                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(new { success = msg },
                                new JsonSerializerSettings { Formatting = Formatting.Indented }));
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        [HttpPut]
        public async Task UpdateCourseAsync([FromBody] CourseIdViewModel course)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newCourse = await courseRepository.Get(course.Id);

                    if (newCourse == null)
                        throw new Exception("Курс не найден!");

                    newCourse.Number = course.Number.Value;

                    await courseRepository.Update(newCourse);

                    string msg = String.Format("Курс '{0}' успешно изменен!", course.Number);
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
        public async Task UpdateCourseAsync(int id)
        {
            try
            {
                var course = await courseRepository.Get(id);

                if (course == null)
                    throw new Exception("Курс не найден!");

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(course, 
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