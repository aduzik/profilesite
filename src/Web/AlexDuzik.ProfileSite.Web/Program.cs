var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRouting(options => {
    options.LowercaseUrls = true;
});
builder.Services.AddRazorPages();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints => {
    endpoints.MapRazorPages();
});

app.Run();
