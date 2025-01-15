using TemplateApp.Infrastructure;

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
                using var scope = app.Services.CreateScope();
                var initialiser = scope.ServiceProvider.GetRequiredService<AppDbContextInitializer>();
                initialiser.InitialiseAsync().Wait();
                initialiser.SeedAsync().Wait();
            }

            app.UseCors("clientPolicy");

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();


            return app;
        }
    }
}
