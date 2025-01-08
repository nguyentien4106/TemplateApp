using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Account
{
    public partial class AccountBaseServices
    {
        public async Task<Result<AccountTokenDTO>> LoginAsync(AccountDTO request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {

                return new Result<AccountTokenDTO>().SetError("Email not found", new());
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, true);
            if (result.Succeeded)
            {
                var token = await GenerateUserToken(user);
                return new Result<AccountTokenDTO>().SetSuccess(token);
            }

            return new Result<AccountTokenDTO>().SetError(result.ToString(), new());
        }
    }
}
