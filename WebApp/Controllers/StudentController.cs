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
    [Route("api/Student")]
    public class StudentController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Group> groupRepository;
        private IGenericRepository<Student> studentRepository;
        private int defaultPageSize = 5;

        public StudentController(IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
            groupRepository = this.repositoryFacade.CreateGenericRepository<Group>();
            studentRepository = this.repositoryFacade.CreateGenericRepository<Student>();
        }


        [HttpGet]
        public PageInfo<Student> GetStudents(int? page)
        {
            int currentPage = page ?? 1;

            try
            {
                var students = studentRepository.GetAll();

                PageInfo<Student> p = new PageInfo<Student>()
                {
                    CurrentPage = currentPage,
                    TotalElements = (int)Math.Ceiling(students.Count() / (double)defaultPageSize),
                    Records = students.OrderBy(x => x.Id).Skip((currentPage - 1) * defaultPageSize).Take(defaultPageSize)
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        
        [HttpPost]
        public async Task CreateStudentAsync([FromBody] StudentViewModel student)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var exists = studentRepository.Get(r => r.Name == student.Name).SingleOrDefault();
                    if ((exists != null) && (exists.GroupId == student.GroupId))
                        throw new Exception("Student already exists");

                    var group = await groupRepository.Get(student.GroupId);
                    if (group == null)
                        throw new Exception("Student is not found");

                    Student newStudent = new Student()
                    {
                        Name = student.Name,
                        GroupId = student.GroupId,
                    };
                    await studentRepository.Insert(newStudent);

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
        public async Task DeleteStudentAsync(int id)
        {
            try
            {
                await studentRepository.Delete(id);

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
        public async Task UpdateStudentAsync([FromBody] StudentIdViewModel student)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newStudent = await studentRepository.Get(student.Id);

                    if (newStudent == null)
                        throw new Exception("Student is not found");

                    newStudent.Name = student.Name;
                    newStudent.GroupId = student.GroupId;

                    await studentRepository.Update(newStudent);

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
        
        [HttpGet("{id}")]
        public async Task UpdateStudentAsync(int id)
        {
            try
            {
                var student = await studentRepository.Get(id);

                if (student == null)
                    throw new Exception("Student is not found");

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(student,
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