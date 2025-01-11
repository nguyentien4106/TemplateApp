using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Auth
{
    public partial class AuthBaseServices
    {
        public async Task<Result<AccountTokenDTO>> LoginAsync(AccountDTO request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return Result<AccountTokenDTO>.NotFound("The email given was not found in system! Please try again.");
            }

            var result = await signInManager.PasswordSignInAsync(user, request.Password, true, true);
            if (result.Succeeded)
            {
                var token = await GenerateUserToken(user);
                return new Result<AccountTokenDTO>().SetSuccess(token);
            }

            if (result.IsLockedOut) 
            {
                return Result<AccountTokenDTO>.Failed("Your account has been locked out");
            }

            if (result.IsNotAllowed)
            {
                return Result<AccountTokenDTO>.Failed("Your account hasn't been allowed");
            }

            if (result.RequiresTwoFactor)
            {
                return Result<AccountTokenDTO>.Failed("Your account didn't turn the two factor on! Please turn 2FA on first.");
            }

            return Result<AccountTokenDTO>.Failed("Password was incorrect! Please try again.");
        }
    }
}
