using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
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
                return new Result<bool>().SetError("The user with email given was not found!", false);
            }
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var url = $"{jwt.Audience}/reset-password";
            var param = new Dictionary<string, string>()
            {
                { "token", token },
                { "email", email },
            };

            var resetLink = new Uri(QueryHelpers.AddQueryString(url, param));
            // Build the reset link
            var emailHtml = File.ReadAllText(Path.Join(environment.ContentRootPath, "Templates", "reset-password.html"));
            var e = new Email
            {
                To = user.Email,
                ToName = user.UserName,
                Subject = "Reset your password!",
                BodyHtml = emailHtml.Replace("[LINK]", resetLink.ToString()).Replace("[EMAIL]", user.Email),
                //Body = "Hello World!",
            };

            return await emailSender.SendEmailAsync(e);
        }
    }
}
