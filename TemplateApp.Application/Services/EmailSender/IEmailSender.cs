using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.EmailSender
{
    public interface IEmailSender
    {
        Task<Result<bool>> SendEmailAsync(TemplateApp.Domain.Models.Email email);

        Task Excute();
    }
}
