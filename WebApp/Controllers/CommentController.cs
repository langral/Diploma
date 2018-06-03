using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
//using Models;
using Newtonsoft.Json;
using WebApp.Infrastructure.Extenstions;
using WebApp.Models;
using WebApp.Models.ViewModels;

namespace WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Comment")]
    public class CommentController : Controller
    {
        protected readonly IRepositoryFacade repositoryFacade;

        private IGenericRepository<Comment> commentRepository;
        private IGenericRepository<Student> studentRepository;
        private IGenericRepository<Magazine> magazineRepository;
        private int defaultPageSize = 5;

        public CommentController(IRepositoryFacade repositoryFacade)
        {
            this.repositoryFacade = repositoryFacade;
            commentRepository = this.repositoryFacade.CreateGenericRepository<Comment>();
            studentRepository = this.repositoryFacade.CreateGenericRepository<Student>();
            magazineRepository = this.repositoryFacade.CreateGenericRepository<Magazine>();
        }


        [HttpGet]
        public PageInfo<Comment> GetComments(int? page)
        {
            int currentPage = page ?? 1;

            try
            {
                var comments = commentRepository.GetAll();

                PageInfo<Comment> p = new PageInfo<Comment>()
                {
                    CurrentPage = currentPage,
                    TotalElements = (int)Math.Ceiling(comments.Count() / (double)defaultPageSize),
                    Records = comments.OrderBy(x => x.Id).Skip((currentPage - 1) * defaultPageSize).Take(defaultPageSize)
                };

                return p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpPost]
        public async Task CreateCommentsAsync([FromBody] CommentViewModel comments)
        {
            if (ModelState.IsValid)
            {
                var students = studentRepository.Get(s => s.GroupId == comments.GroupId);

                if (students != null && students.Count() > 0)
                    foreach (var st in students)
                    {
                        var comment = new Comment()
                        {
                            StudentId = st.Id,
                            MagazineId = comments.MagazineId,
                            Note = comments.note
                        };
                        await commentRepository.Insert(comment);
                    }
                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync("Ok");
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values);
            }
        }

        [HttpDelete("{id}")]
        public async Task DeleteCommentAsync(int id)
        {
            try
            {
                await commentRepository.Delete(id);

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
        public async Task UpdateCommentAsync([FromBody] CommentIdViewModel comment)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newComment = await commentRepository.Get(comment.Id);

                    if (newComment == null)
                        throw new Exception("Comment is not found");

                    newComment.Note = comment.Note;

                    await commentRepository.Update(newComment);

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
        public async Task UpdateCommentAsync(int id)
        {
            try
            {
                var comment = await commentRepository.Get(id);

                if (comment == null)
                    throw new Exception("Comment is not found");

                Response.StatusCode = StatusCodes.Status200OK;
                await Response.WriteAsync(JsonConvert.SerializeObject(comment,
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