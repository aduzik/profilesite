using AlexDuzik.ProfileSite.Data.Configurations;
using AlexDuzik.ProfileSite.Web;
using Microsoft.EntityFrameworkCore;

namespace AlexDuzik.ProfileSite.Data;

public class BlogDbContext : DbContext
{
    public BlogDbContext(DbContextOptions<BlogDbContext> options) 
        : base (options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new PostConfiguration());
    }

    public DbSet<Post> Posts { get; set; } = null!;
}
