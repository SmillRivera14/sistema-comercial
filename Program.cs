using Sistema_comercial.Security.JWT;
using Microsoft.EntityFrameworkCore;
using Sistema_comercial.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Sistema_comercial.Security;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSwaggerConfiguration();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<JwtServices>();

// Configurar la autenticación JWT
var key = builder.Configuration["AppSettings:Token"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            ValidateIssuer = false,
            ValidateAudience = false
        };

        // Extraer el token de las cookies
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                // Verifica si hay cookies
                var token = context.Request.Cookies["JWT"];
                if (!string.IsNullOrEmpty(token))
                {
                    context.Token = token;
                }
                return Task.CompletedTask;
            }
        };
    });

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
     throw new InvalidOperationException("Connection string 'BloggingContext'" +
    " not found.");

builder.Services.AddDbContext<SistemaComercialContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();

app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware personalizado para extraer el JWT de la cookie

app.UseMiddleware<JwtFromCookieMiddleware>();

app.UseCookiesConfiguration();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
