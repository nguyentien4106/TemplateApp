using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Auth
{
    public partial class AuthBaseServices
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
