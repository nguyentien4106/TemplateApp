namespace TemplateApp.Domain.DTOs.Product
{
    public record BaseDto 
    {
        public Guid Id { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
