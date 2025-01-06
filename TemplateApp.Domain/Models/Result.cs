namespace TemplateApp.Domain.Models
{
    public class Result<T>
    {
        public string Message { get; set; }

        public bool Succeed { get; set; } = true;

        public T Data { get; set; }

        public Result<T> SetSuccess(T data)
        {
            Data = data;
            return this;
        }

        public Result<T> SetError(string message, T data)
        {
            Data = data;
            Message = message;
            Succeed = false;

            return this;
        }
    }
}
