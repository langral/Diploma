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

namespace WebApp.Controllersуу
{
    [Produces("application/json")]
    [Route("api/Magazine")]
    public class MagazineController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Magazine> magazineRepository;
        private IGenericRepository<Subject> subjectRepository;
        private int defaultPageSize = 5;

        public MagazineController(IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
            magazineRepository = this.repositoryFacade.CreateGenericRepository<Magazine>();
            subjectRepository = this.repositoryFacade.CreateGenericRepository<Subject>();
        }


        [HttpGet]
        public PageInfo<Magazine> GetRecords(int? page)
        {
            int currentPage = page ?? 1;

            try
            {
                var magazines = magazineRepository.GetAll();

                PageInfo<Magazine> p = new PageInfo<Magazine>()
                {
                    CurrentPage = currentPage,
                    TotalElements = (int)Math.Ceiling(magazines.Count() / (double)defaultPageSize),
                    Records = magazines.OrderBy(x => x.Id).Skip((currentPage - 1) * defaultPageSize).Take(defaultPageSize)
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpPost]
        public async Task CreateMagazineAsync([FromBody] MagazineViewModel magazine)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var subject = await subjectRepository.Get(magazine.SubjectId);
                    if (subject == null)
                        throw new Exception("Subject is not found");

                    Magazine newMagazine = new Magazine()
                    {
                        SubjectId = magazine.SubjectId
                    };
                    await magazineRepository.Insert(newMagazine);

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
        public async Task DeleteMagazineAsync(int id)
        {
            try
            {
                await magazineRepository.Delete(id);

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
        public async Task UpdateMagazineAsync([FromBody] MagazineIdViewModel magazine)
        {
            if (ModelState.IsValid)
            {
                var newMagazine = await magazineRepository.Get(magazine.Id);

                if (newMagazine == null)
                    throw new Exception("Record is not found");

                newMagazine.SubjectId = magazine.SubjectId;

                await magazineRepository.Update(newMagazine);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        [HttpGet("{id}")]
        public async Task UpdateMagazineAsync(int id)
        {
            try
            {
                var magazine = await magazineRepository.Get(id);

                if (magazine == null)
                    throw new Exception("Record is not found");

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(magazine,
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