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
        public async Task CreateCourseAsync([FromBody] CourseViewModel course)
        {
            //cделать проверку на то есть ли такой курс уже
            if (ModelState.IsValid)
            {
                Course newCourse = new Course()
                {
                    Number = course.Number.Value
                };
                await courseRepository.Insert(newCourse);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }          
        }

        [HttpDelete("{id}")]
        public async Task DeleteCourseAsync(int id)
        {
            try
            {
                await courseRepository.Delete(id);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
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
                var newCourse = await courseRepository.Get(course.Id);

                if (newCourse == null)
                    throw new Exception("Course is not found");

                newCourse.Number = course.Number.Value;

                await courseRepository.Update(newCourse);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
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
                    throw new Exception("Course is not found");

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