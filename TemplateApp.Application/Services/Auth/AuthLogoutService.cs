using System.Security.Claims;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Auth
{
    public partial class AuthBaseServices
    {
        public async Task<Result<bool>> LogoutAsync(ClaimsPrincipal user)
        {
            if (user.Identity?.IsAuthenticated ?? false)
            {
                var username = user.Claims.First(x => x.Type == "UserName").Value;
                var appUser = context.Users.First(x => x.UserName == username);
                if (appUser != null) { await userManager.UpdateSecurityStampAsync(appUser); }
                return new Result<bool>().SetSuccess(true);
            }

            return new Result<bool>().SetSuccess(true);
        }
    }
}
