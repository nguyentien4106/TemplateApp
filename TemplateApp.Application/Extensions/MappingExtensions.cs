using AutoMapper;
using TemplateApp.Application.Mapper;
using TemplateApp.Domain.Models;
using TemplateApp.Domain.Models.Result;

namespace TemplateApp.Application.Extensions
{
    public static class MappingExtensions
    {
        public static Result<TDest> ToDto<T, TDest>(this Result<T> src)
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
            var mapper = config.CreateMapper();

            return new Result<TDest>
            {
                Succeed = src.Succeed,
                Message = src.Message,
                Data = mapper.Map<TDest>(src.Data)
            };
        }

        public static Result<PaginationResultModel<TDest>> ToPaginationDto<T, TDest>(this Result<PaginationResultModel<T>> src)
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
            var mapper = config.CreateMapper();

            var data = new PaginationResultModel<TDest>()
            {
                PageIndex = src.Data?.PageIndex ?? 1,
                PageSize = src.Data?.PageSize ?? 10,
                Total = src.Data?.Total ?? 0,
                Items = mapper.Map<List<TDest>>(src.Data?.Items)
            };

            return new Result<PaginationResultModel<TDest>>
            {
                Succeed = src.Succeed,
                Message = src.Message,
                Data = data
            };
        }
    }
}
