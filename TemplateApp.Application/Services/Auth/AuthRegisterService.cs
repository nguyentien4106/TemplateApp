using System.Text;
using Microsoft.AspNetCore.Identity;
using TemplateApp.Domain.Constants;
using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Auth
{
    public partial class AuthBaseServices
    {
        public async Task<Result<AccountDTO>> RegisterAsync(AccountDTO request)
        {
            var user = new IdentityUser()
            {
                UserName = request.Email,
                Email = request.Email,
            };
            
            var result = await userManager.CreateAsync(user, request.Password);
            await userManager.AddToRoleAsync(user, Roles.User);
            if (result.Succeeded)
            {
                return new Result<AccountDTO>().SetSuccess(request);
            }
            else
            {
                return new Result<AccountDTO>().SetError(GetRegisterErrors(result), request);
            }
        }

        private static string GetRegisterErrors(IdentityResult result)
        {
            StringBuilder stringBuilder = new();

            foreach (var error in result.Errors)
            {
                stringBuilder.Append(error.Description);
            }

            return stringBuilder.ToString();
        }
    }
}
