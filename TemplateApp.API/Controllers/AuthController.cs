using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;
using AuthBaseServices = TemplateApp.Application.Services.Auth.AuthBaseServices;

namespace TemplateApp.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController(AuthBaseServices services) : ControllerBase
    {
        [HttpPost]
        public async Task<Result<AccountDTO>> Register([FromBody] AccountDTO account)
        {
            return await services.RegisterAsync(account);
        }

        [HttpPost]
        public async Task<Result<AccountTokenDTO>> Login([FromBody] AccountDTO account)
        {
            return await services.LoginAsync(account);
        }

        [HttpPost]
        public async Task<Result<bool>> Logout()
        {
            return await services.LogoutAsync(User);
        }

        [HttpPost]
        public async Task<Result<AccountTokenDTO>> RefreshToken(AccountTokenDTO token)
        {
            return await services.RefreshTokenAsync(token);
        }

        [HttpPost]
        public async Task<Result<bool>> ForgotPassword(string email)
        {
            return await services.ForgotPasswordAsync(email);
        }

        [HttpPost]
        public async Task<Result<bool>> ResetPassword(ResetPasswordModel model)
        {
            return await services.ResetPasswordAsync(model);
        }

        [HttpPost]
        [Authorize]
        public string Profile()
        {
            return User.FindFirst("UserName")?.Value ?? "No profile found.";
        }
    }
}
