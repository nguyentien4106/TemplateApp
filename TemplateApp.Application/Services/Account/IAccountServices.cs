using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Account
{
    public interface IAccountServices
    {
        bool Login(AccountDTO dto);

        Task<Result<AccountDTO>> Register(AccountDTO dto);
    }
}
