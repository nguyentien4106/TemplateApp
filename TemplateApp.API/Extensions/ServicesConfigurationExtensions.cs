using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TemplateApp.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using TemplateApp.Infrastructure.Constants;
using System.Text;
using TemplateApp.Application.Services.Account;

namespace TemplateApp.API.Extensions
{
    public static class ServicesConfigurationExtensions
    {
        public static IServiceCollection AddBaseServices(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            return services;
        }

        public static IServiceCollection AddInfrastructures(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options => 
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
            );
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            var jwtSettings = configuration.GetSection("JWT").Get<JwtSettings>() ?? null;

            ArgumentNullException.ThrowIfNull(nameof(jwtSettings));
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings?.Issuer,
                    ValidAudience = jwtSettings?.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings?.Key))
                };
            });


            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<IAccountServices, AccountServices>();

            return services;
        }
    }
}
