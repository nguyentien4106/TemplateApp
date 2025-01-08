using TemplateApp.Domain.DTOs.Account;
using TemplateApp.Domain.Models;

namespace TemplateApp.Application.Services.Account
{
    public interface IAccountServices
    {
        Task<Result<AccountTokenDTO>> Login(AccountDTO dto);

        Task<Result<AccountDTO>> Register(AccountDTO dto);
    }
}
