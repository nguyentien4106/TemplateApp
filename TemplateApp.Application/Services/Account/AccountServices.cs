using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Account
{
    public class AccountServices(
        UserManager<IdentityUser> userManager, 
        SignInManager<IdentityUser> signInManager, 
        IConfiguration configuration
    ) : IAccountServices
    {
        public bool Login(AccountDTO dto)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<AccountDTO>> Register(AccountDTO account)
        {
            var user = new IdentityUser { UserName = account.Username, Email = account.Email };
            var result = await userManager.CreateAsync(user, account.Password);
            //if (result.Succeeded)
            //{
            //    return Ok(new { message = "User registered successfully" });
            //}
            //return BadRequest(result.Errors);
            if (result.Succeeded) 
            {
                return new Result<AccountDTO>().SetSuccess(account);
            }

            return new Result<AccountDTO>().SetError(string.Join("-", result.Errors.Select(item => item.Description)), account);
        }
    }
}
