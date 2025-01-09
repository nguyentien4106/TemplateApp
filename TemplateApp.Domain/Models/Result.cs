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

        public static Result<T> NotFound(string message = "Not found.") 
        {
            return new Result<T>() 
            {
                Data = default,
                Succeed = false,
                Message = message
            };
        }

        public static Result<T> Success(T data, string message = "Successfully")
        {
            return new Result<T>()
            {
                Data = data,
                Succeed = true,
                Message = message
            };
        }

        public static Result<T> Failed(string message = "Failed", T data = default)
        {
            return new Result<T>()
            {
                Data = data,
                Succeed = false,
                Message = message
            };
        }
    }
}
