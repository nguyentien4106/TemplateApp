using Microsoft.AspNetCore.Mvc;
using TemplateApp.Application.Services.Account;
using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;

namespace TemplateApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(IAccountServices services) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<Result<AccountDTO>> Register([FromBody] AccountDTO account)
        {
            //var user = new IdentityUser { UserName = model.Username, Email = model.Email };
            //var result = await _userManager.CreateAsync(user, model.Password);
            //if (result.Succeeded)
            //{
            //    return Ok(new { message = "User registered successfully" });
            //}
            //return BadRequest(result.Errors);
            var result = await services.Register(account);

            return result;
        }

    }
}
