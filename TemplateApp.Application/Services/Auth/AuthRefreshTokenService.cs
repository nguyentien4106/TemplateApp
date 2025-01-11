using TemplateApp.Application.Helpers;
using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Auth
{
    public partial class AuthBaseServices
    {
        public async Task<Result<AccountTokenDTO>> RefreshTokenAsync(AccountTokenDTO request)
        {
            var principal = TokenUtils.GetPrincipalFromExpiredToken(jwt, request.AccessToken);
            if (principal == null || principal.FindFirst(UserName)?.Value == null)
            {
                return new Result<AccountTokenDTO>().SetError("User with Email given was not found.", new());
            }

            var user = await userManager.FindByNameAsync(principal.FindFirst(UserName)?.Value ?? "");
            if (user == null)
            {
                return new Result<AccountTokenDTO>().SetError("User with Email given was not found.", new());
            }

            if (!await userManager.VerifyUserTokenAsync(user, jwt.RefreshTokenProvider, jwt.RefreshToken, request.RefreshToken))
            {
                return new Result<AccountTokenDTO>().SetError("Refresh token was expired.", new());
            }
            var token = await GenerateUserToken(user);

            return new Result<AccountTokenDTO>().SetSuccess(new() { AccessToken = token.AccessToken, RefreshToken = token.RefreshToken });
        }
    }
}
