namespace TemplateApp.Infrastructure.Entities
{
    public class BaseEntity
    {
        public Guid Id { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
