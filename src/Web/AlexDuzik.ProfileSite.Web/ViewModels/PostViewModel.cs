namespace AlexDuzik.ProfileSite.Web.ViewModels;

public class PostViewModel
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Body { get; set; }
    public DateTime Date { get; set; }
}
