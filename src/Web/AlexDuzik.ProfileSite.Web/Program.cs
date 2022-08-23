var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRouting(options => {
    options.LowercaseUrls = true;
});

var app = builder.Build();

app.UseStaticFiles();

app.UseRouting();

app.MapFallbackToFile("index.html");

app.Run();
