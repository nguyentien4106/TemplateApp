using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TemplateApp.Domain.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using TemplateApp.Infrastructure.Constants;
using TemplateApp.Application.Extensions;

namespace TemplateApp.Application.Services.EmailSender
{
    public class EmailSender(SendGridSettings setting) : IEmailSender
    {
        public Task Excute()
        {
            throw new NotImplementedException();
        }

        public async Task<Result<bool>> SendEmailAsync(Email email)
        {
            var client = new SendGridClient(setting.Key);
            var msg = MailHelper.CreateSingleEmail(email.FromEmailAddress(), email.ToEmailAddress(), email.Subject, email.Body, email.BodyHtml);
            try
            {
                await client.SendEmailAsync(msg);

                return new Result<bool>().SetSuccess(true);
            }
            catch (Exception ex) 
            {
                return new Result<bool>().SetError(ex.Message, false);
            }
        }
    }
}
