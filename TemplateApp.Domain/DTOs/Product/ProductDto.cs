namespace TemplateApp.Domain.DTOs.Product
{
    public record ProductDto : BaseDto
    {
        public string Name { get; set; }

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public bool IsActive { get; set; }
    }
}
