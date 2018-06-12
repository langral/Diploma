using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using Newtonsoft.Json;
using WebApp.Infrastructure.Extenstions;
using WebApp.Models.ViewModels;

namespace WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;

        public AuthController(UserManager<User> userManager,
                                 IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task Login([FromBody] LoginViewModel model)
        {

            if (ModelState.IsValid)
            {
                var userToVerify = await userManager.FindByNameAsync(model.UserName);


                if (userToVerify == null)
                {
                    await Response.BadRequestHelper(ModelState.Values, StatusCodes.Status401Unauthorized);
                }
                else if (await userManager.CheckPasswordAsync(userToVerify, model.Password))
                {
                    List<Claim> claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, model.UserName),

                    };

                    var roles = await userManager.GetRolesAsync(userToVerify);

                    foreach (var role in roles)
                    {
                        claims.Add(new Claim(ClaimTypes.Role, role));
                    }

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["SecurityKey"]));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                                        issuer: "yourdomain.com",
                                        audience: "yourdomain.com",
                                        claims: claims,
                                        expires: DateTime.Now.AddMinutes(30),
                                        signingCredentials: creds);

                    var response = new
                    {
                        auth_token = new JwtSecurityTokenHandler().WriteToken(token),
                        username = userToVerify.UserName,
                        roles
                    };

                    Response.StatusCode = StatusCodes.Status200OK;
                    await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                }
                else
                {
                    await Response.BadRequestHelper(ModelState.Values, StatusCodes.Status401Unauthorized);
                }
            }
            else
            {
                await Response.BadRequestHelper(ModelState.Values, StatusCodes.Status401Unauthorized);
            }
        }

    }
}