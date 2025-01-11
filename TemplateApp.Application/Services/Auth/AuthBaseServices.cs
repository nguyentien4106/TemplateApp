using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using TemplateApp.Application.Helpers;
using TemplateApp.Application.Services.EmailSender;
using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;
using TemplateApp.Infrastructure;
using TemplateApp.Infrastructure.Constants;

namespace TemplateApp.Application.Services.Auth
{
    public partial class AuthBaseServices(
            UserManager<IdentityUser> userManager, 
            SignInManager<IdentityUser> signInManager,
            JwtSettings jwt,
            AppDbContext context,
            IEmailSender emailSender,
            IHostingEnvironment environment
        )
    {
        private string UserName = "userName";
        private string Email = "email";

        private async Task<AccountTokenDTO> GenerateUserToken(IdentityUser user)
        {
            var claims = (from ur in context.UserRoles
            where ur.UserId == user.Id
            join r in context.Roles on ur.RoleId equals r.Id
                          join rc in context.RoleClaims on r.Id equals rc.RoleId
                          select rc)
              .Where(rc => !string.IsNullOrEmpty(rc.ClaimValue) && !string.IsNullOrEmpty(rc.ClaimType))
              .Select(rc => new Claim(rc.ClaimType!, rc.ClaimValue!))
              .Distinct()
            .ToList();

            var roleClaims = (from ur in context.UserRoles
            where ur.UserId == user.Id
                              join r in context.Roles on ur.RoleId equals r.Id
                              select r)
              .Where(r => !string.IsNullOrEmpty(r.Name))
              .Select(r => new Claim(ClaimTypes.Role, r.Name!))
              .Distinct()
              .ToList();

            claims.AddRange(roleClaims);

            var token = TokenUtils.GetToken(jwt, user, claims);
            await userManager.RemoveAuthenticationTokenAsync(user, jwt.RefreshTokenProvider, jwt.RefreshToken);
            var refreshToken = await userManager.GenerateUserTokenAsync(user, jwt.RefreshTokenProvider, jwt.RefreshToken);
            await userManager.SetAuthenticationTokenAsync(user, jwt.RefreshTokenProvider, jwt.RefreshToken, refreshToken);
            
            return new AccountTokenDTO() { AccessToken = token, RefreshToken = refreshToken };
        }
    }
}
