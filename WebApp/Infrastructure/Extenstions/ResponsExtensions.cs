using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary;

namespace WebApp.Infrastructure.Extenstions
{
    public static class ResponsExtensions
    {
        public static async Task BadRequestHelper(this HttpResponse resp,
                                                  ValueEnumerable modelState,
                                                  int? statusCode = 400)
        {
            List<string> errorsFromState = new List<string>();

            foreach (var state in modelState)
            {
                foreach (var error in state.Errors)
                {
                    errorsFromState.Add(error.ErrorMessage);
                }
            }


            resp.StatusCode = statusCode ?? StatusCodes.Status400BadRequest;

            if (errorsFromState.Count > 0)
            {
                resp.ContentType = "application/json";
                await resp.WriteAsync(JsonConvert.SerializeObject(new { errors = errorsFromState },
                                new JsonSerializerSettings { Formatting = Formatting.Indented }));
            }
            else
            {
                await resp.WriteAsync("unknown error");
            }

        }
    }
}
