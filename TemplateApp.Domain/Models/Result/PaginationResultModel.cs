namespace TemplateApp.Domain.Models.Result
{
    public class PaginationResultModel<T>
    {
        public int Total { get; set; } = 0;

        public int PageIndex { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public List<T> Items { get; set; } = [];
    }
}
