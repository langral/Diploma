using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;
using WebApp.Infrastructure.Extenstions;
using WebApp.Models.ViewModels;

namespace WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;


        public AccountController(UserManager<User> userManager,
                                 RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;

        }

        [HttpPost]
        [Route("register")]
        public async Task RegisterTeacher([FromBody] RegisterTeacherViewModel model)
        {
            try
            {
                var userName = User.Identity.Name;
                if (ModelState.IsValid)
                {
                    Teacher user = new Teacher {
                        UserName = model.UserName,
                        FIO = model.FIO,
                        Email = model.Email
                    };

                    var result = await userManager.CreateAsync(user, model.Password);
           
                    if (result.Succeeded)
                    {

                        var managerResult = await userManager.AddToRoleAsync(user, "teacher");
                        managerResult = await userManager.AddToRoleAsync(user, "user");

                        if (managerResult.Succeeded)
                        {
                            Response.StatusCode = StatusCodes.Status200OK;
                            var body = JsonConvert.SerializeObject(new { user.Id }, 
                                                                    new JsonSerializerSettings { Formatting = Formatting.Indented });
                
                            await Response.WriteAsync(body);
                        }

                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }


                        await Response.BadRequestHelper(ModelState.Values);
                    }
                }
                else
                {
                    await Response.BadRequestHelper(ModelState.Values);
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Error", e.Message);
                await Response.BadRequestHelper(ModelState.Values);
            }
        }
    }
}