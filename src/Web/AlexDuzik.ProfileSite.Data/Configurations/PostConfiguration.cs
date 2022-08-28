using AlexDuzik.ProfileSite.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AlexDuzik.ProfileSite.Data.Configurations;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Title).IsRequired();
        builder.Property(p => p.Body).IsRequired();
        builder.OwnsOne(p => p.Permalink,
                permalink =>
                {
                    permalink.Property(p => p.Slug).IsRequired();
                    permalink.WithOwner();
                });
        builder.Navigation(p => p.Permalink)
            .IsRequired();
    }
}
