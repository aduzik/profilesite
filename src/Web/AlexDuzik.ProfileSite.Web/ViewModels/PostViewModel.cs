namespace AlexDuzik.ProfileSite.Web.ViewModels;

public class PostViewModel
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Slug { get; set; }
    public string? Body { get; set; }
    public DateTime Date { get; set; }
    public string? Permalink { get; set; }
}
