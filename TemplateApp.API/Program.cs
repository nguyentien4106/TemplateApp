using TemplateApp.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddBaseServices();
builder.Services.AddInfrastructures(builder.Configuration);
builder.Services.AddApplicationServices();

var app = builder.Build();

app.ConfigureApp();

app.Run();
