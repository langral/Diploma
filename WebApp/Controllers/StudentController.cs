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
            try
            {
                var students = studentRepository.GetAll();

                PageInfo<Student> p = new PageInfo<Student>()
                {
                    CurrentPage = page,
                    TotalElements = (int)Math.Ceiling(students.Count() / (double)defaultPageSize),
                    Records = (page != null) ? students.OrderBy(x => x.Id).Skip((page.Value - 1) * defaultPageSize).Take(defaultPageSize) : students,
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
        public async Task CreateStudentAsync([FromBody] StudentViewModel student)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var exists = studentRepository.Get(r => r.Name == student.Name).SingleOrDefault();
                    if ((exists != null) && (exists.GroupId == student.GroupId))
                        throw new Exception("Студент уже существует!");

                    var group = await groupRepository.Get(student.GroupId);
                    if (group == null)
                        throw new Exception("Группа не найдена!");

                    Student newStudent = new Student()
                    {
                        Name = student.Name,
                        GroupId = student.GroupId,
                    };
                    await studentRepository.Insert(newStudent);

                    string msg = String.Format("Студент '{0}' успешно создан!", newStudent.Name);
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
        
        public async Task DeleteStudentAsync(int id)
        {
            try
            {
                await studentRepository.Delete(id);

                string msg = String.Format("Студент успешно удален!");
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
        public async Task UpdateStudentAsync([FromBody] StudentIdViewModel student)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newStudent = await studentRepository.Get(student.Id);

                    if (newStudent == null)
                        throw new Exception("Студент не найден!");

                    newStudent.Name = student.Name;
                    newStudent.GroupId = student.GroupId;

                    await studentRepository.Update(newStudent);

                    string msg = String.Format("Студент '{0}' успешно создан!", newStudent.Name);
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
        public async Task UpdateStudentAsync(int id)
        {
            try
            {
                var student = await studentRepository.Get(id);

                if (student == null)
                    throw new Exception("Студент не найден!");

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