using AlexDuzik.ProfileSite.Data;
using AlexDuzik.ProfileSite.Web;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.UI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddAuthorization();

builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
});
builder.Services.AddControllers();
builder.Services.AddRazorPages()
    .AddMicrosoftIdentityUI();

builder.Services.AddDbContext<BlogDbContext>(
    options =>
    {
        switch (builder.Configuration["DbProvider"])
        {
            case "Sqlite":
                options.UseSqlite(builder.Configuration.GetConnectionString("SqliteBlog"),
                    config => config.MigrationsAssembly("AlexDuzik.ProfileSite.Data.Sqlite"));
                break;

            case "SqlServer":
                options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerBlog"), 
                    config => config.MigrationsAssembly("AlexDuzik.ProfileSite.Data.SqlServer"));
                break;

            default:
                throw new InvalidOperationException();
        }
    });

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapRazorPages();
app.MapFallbackToFile("index.html");

app.Run();
