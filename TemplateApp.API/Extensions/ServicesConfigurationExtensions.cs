﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TemplateApp.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using TemplateApp.Infrastructure.Constants;
using System.Text;
using TemplateApp.Application.Services.EmailSender;
using AuthBaseServices = TemplateApp.Application.Services.Auth.AuthBaseServices;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.DependencyInjection;
using TemplateApp.Application.Services.Products;

namespace TemplateApp.API.Extensions
{
    public static class ServicesConfigurationExtensions
    {
        public static IServiceCollection AddBaseServices(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddScoped<AppDbContextInitializer>();

            return services;
        }

        public static IServiceCollection AddInfrastructures(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JWT").Get<JwtSettings>() ?? null;
            ArgumentNullException.ThrowIfNull("JwtSettings was missed !");

            var sendGrid = configuration.GetSection("SendGrid").Get<SendGridSettings>() ?? null;
            ArgumentNullException.ThrowIfNull("SendGridSettings was missed !");

            services.AddDbContext<AppDbContext>(options => 
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
            );
           
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddRoles<IdentityRole>()
                .AddSignInManager()
                .AddUserManager<UserManager<IdentityUser>>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>(jwtSettings.RefreshTokenProvider)
                .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("Default")
                ;

            services.Configure<DataProtectionTokenProviderOptions>(options =>
            {
                options.TokenLifespan = TimeSpan.FromSeconds(jwtSettings.RefreshTokenExpireSeconds);
            });

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
                            RequireExpirationTime = true,
                            ValidIssuer = jwtSettings?.Issuer,
                            ValidAudience = jwtSettings?.Audience,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings?.SecretKey)),
                            ClockSkew = TimeSpan.FromSeconds(0)
                        };
                    });

            services.AddCors(options =>
            {
                options.AddPolicy("clientPolicy", builder =>
                {
                    builder.AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins(jwtSettings.Audience)
                    .AllowCredentials();
                });
            });
            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new OpenApiInfo { Title = "TemplateApp API", Version = "v1" });
                config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });
                config.AddSecurityRequirement(
                    new OpenApiSecurityRequirement{
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type=ReferenceType.SecurityScheme,
                                    Id="Bearer"
                                }
                            },
                            Array.Empty<string>()
                        }
                    });
            });
            services.AddSingleton(jwtSettings);
            services.AddSingleton(sendGrid);

            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<AuthBaseServices>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IProductService, ProductService>();

            return services;
        }
    }
}
