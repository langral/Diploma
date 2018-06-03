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
    [Route("api/Record")]
    public class RecordController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Record> recordRepository;
       // private IGenericRepository<Student> studentRepository;
        private IGenericRepository<Magazine> magazineRepository;
        private IGenericRepository<Student> studentRepository;
       
        private int defaultPageSize = 5;

        public RecordController(IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
            recordRepository = this.repositoryFacade.CreateGenericRepository<Record>();
            studentRepository = this.repositoryFacade.CreateGenericRepository<Student>();
            magazineRepository = this.repositoryFacade.CreateGenericRepository<Magazine>();
        }


        [HttpGet]
        public PageInfo<Record> GetRecords(int? page)
        {
            int currentPage = page ?? 1;

            try
            {
                var records = recordRepository.GetAll();

                PageInfo<Record> p = new PageInfo<Record>()
                {
                    CurrentPage = currentPage,
                    TotalElements = (int)Math.Ceiling(records.Count() / (double)defaultPageSize),
                    Records = records.OrderBy(x => x.Id).Skip((currentPage - 1) * defaultPageSize).Take(defaultPageSize)
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        
        [HttpPost]
        public async Task CreateSetOfRecordsAsync([FromBody] SetOfRecordsViewModel records)
        {
            if (ModelState.IsValid)
            {
                var students = studentRepository.Get(s => s.GroupId == records.GroupId);

                if (students != null && students.Count() > 0)
                    foreach (var st in students)
                    {
                        var record = new Record()
                        {
                            StudentId = st.Id,
                            MagazineId = records.MagazineId,
                            Visit = "",
                            Date = records.Date
                        };
                        await recordRepository.Insert(record);
                    }
                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }
        }
/*
        [HttpPost]
        public async Task CreateRecordAsync([FromBody] RecordViewModel record)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var student = await studentRepository.Get(record.StudentId);
                    if (student == null)
                        throw new Exception("Student is not found");

                    var magazine = await magazineRepository.Get(record.MagazineId);
                    if (magazine == null)
                        throw new Exception("Magazine is not found");

                    Record newRecord = new Record()
                    {
                        StudentId = record.StudentId,
                        MagazineId = record.MagazineId,
                        Visit = record.Visit,
                        Date = record.Date
                    };
                    await recordRepository.Insert(newRecord);

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
*/
        [HttpDelete("{id}")]
        public async Task DeleteRecordAsync(int id)
        {
            try
            {
                await recordRepository.Delete(id);

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }
        }
        /*[ { id: 1, visit: "fff" }, { id: 2, visit: "+"} ]
{
records: [ { id: 1, visit: "fff" }, { id: 2, visit: "+"} ],
date: 29.05.18
}
foreach(var record in elem.records)
repo.Get(record.id)
x.date = elem.date
x.visit = visit
db.saveChanges
db.Update(x)
*/
        [HttpPut]
        public async Task UpdateSetOfRecordAsync([FromBody] ViewRecordsUpdateModel records)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    foreach (var record in records.Records)
                    {
                        var newRecord = await recordRepository.Get(record.Id);

                        if (newRecord == null)
                            throw new Exception("Record is not found");

                        newRecord.Date = records.Date;
                        newRecord.Visit = record.Visit;

                        await recordRepository.Update(newRecord);
                    }
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

        [HttpPut]
        public async Task UpdateRecordAsync([FromBody] RecordIdViewModel record)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newRecord = await recordRepository.Get(record.Id);

                    if (newRecord == null)
                        throw new Exception("Record is not found");

                    newRecord.StudentId = record.StudentId;
                    newRecord.MagazineId = record.MagazineId;
                    newRecord.Visit = record.Visit;
                    newRecord.Date = record.Date;

                    await recordRepository.Update(newRecord);

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
        public async Task UpdateRecordAsync(int id)
        {
            try
            {
                var record = await recordRepository.Get(id);

                if (record == null)
                    throw new Exception("Record is not found");

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(record,
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