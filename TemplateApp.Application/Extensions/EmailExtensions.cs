using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TemplateApp.Application.Extensions
{
    public static class EmailExtensions
    {
        public static EmailAddress FromEmailAddress(this TemplateApp.Domain.Models.Email email)
        {
            return new EmailAddress(email.From, email.FromName);
        }

        public static EmailAddress ToEmailAddress(this TemplateApp.Domain.Models.Email email)
        {
            return new EmailAddress(email.To, email.ToName);
        }
    }
}
