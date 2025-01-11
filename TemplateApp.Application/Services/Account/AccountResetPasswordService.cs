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
        public async Task<Result<bool>> ResetPasswordAsync(ResetPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null) 
            {
                return Result<bool>.NotFound();
            }
            var result = await userManager.ResetPasswordAsync(user, model.Token, model.Password);

            if (result.Succeeded) 
            {
                return Result<bool>.Success(true);
            }

            return Result<bool>.Failed(string.Join(" - ", result.Errors.Select(item => item.Description)) + model.Token);
        }
    }
}
