using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
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
        public async Task Register([FromBody] RegisterViewModel model)
        {
            try
            {
                var userName = User.Identity.Name;
                if (ModelState.IsValid)
                {
                    User user = new User { UserName = model.UserName };
                    var result = await userManager.CreateAsync(user, model.Password);

                    if (result.Succeeded)
                    {

                        var managerResult = await userManager.AddToRoleAsync(user, "user");

                        if (managerResult.Succeeded)
                        {
                            Response.StatusCode = StatusCodes.Status200OK;
                            await Response.WriteAsync("ok");
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