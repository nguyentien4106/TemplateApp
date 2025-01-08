using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Account
{
    public partial class AccountBaseServices
    {
        public async Task<Result<bool>> ForgotPasswordAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new Result<bool>().SetError("Email not found !", new());
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);

            // Build the reset link
            var resetLink = $"{jwt.Audience}/reset-password?email={email}&token={Uri.EscapeDataString(token)}";
            var emailHtml = File.ReadAllText(Path.Join(environment.ContentRootPath, "Templates", "reset-password.html"));
            var e = new Email
            {
                To = user.Email,
                ToName = user.UserName,
                Subject = "Reset your password!",
                // BodyHtml = emailHtml.Replace("[LINK]", resetLink).Replace("[EMAIL]", user.Email),
                Body = "Hello World!",
            };

            return await emailSender.SendEmailAsync(e);
        }
    }
}
