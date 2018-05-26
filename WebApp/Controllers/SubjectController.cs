﻿using System;
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
        private int defaultPageSize = 5;

        public SubjectController(IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
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
                    Subject newSubject = new Subject()
                    {
                        Name = subject.Name
                    };
                    await subjectRepository.Insert(newSubject);

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
        public async Task DeleteSubjectAsync(int id)
        {
            try
            {
                await subjectRepository.Delete(id);

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
        public async Task UpdateSubjectAsync([FromBody] SubjectIdViewModel subject)
        {
            if (ModelState.IsValid)
            {
                var newSubject = await subjectRepository.Get(subject.Id);

                if (newSubject == null)
                    throw new Exception("Subject is not found");

                newSubject.Name = subject.Name;

                await subjectRepository.Update(newSubject);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
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
                    throw new Exception("Subject is not found");

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