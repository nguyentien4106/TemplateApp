namespace TemplateApp.Domain.DTOs.Product
{
    public record BaseDto
    {
        public Guid Id { get; set; } = Guid.Empty;

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
