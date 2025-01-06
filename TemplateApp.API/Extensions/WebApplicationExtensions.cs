namespace TemplateApp.API.Extensions
{
    public static class WebApplicationExtensions
    {

        public static WebApplication ConfigureApp(this WebApplication app) 
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            return app;
        }
    }
}
