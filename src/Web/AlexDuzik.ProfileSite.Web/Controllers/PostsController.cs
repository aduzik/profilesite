using AlexDuzik.ProfileSite.Data;
using AlexDuzik.ProfileSite.Web.Models;
using AlexDuzik.ProfileSite.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlexDuzik.ProfileSite.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : Controller
{
    private readonly BlogDbContext _dbContext;

    public PostsController(BlogDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetPosts()
    {
        var posts = _dbContext.Posts
            .OrderByDescending(p => p.Created)
            .Take(10)
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Title = p.Title,
                Body = p.Body,
                Date = p.Created
            });

        return Ok(posts);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePost([FromForm] CreatePostModel model, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var post = new Post
        {
            Id = Guid.NewGuid(),
            Created = now,
            Modified = now,
            Title = model.Title,
            Body = model.Body,
        };

        _dbContext.Posts.Add(post);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return NoContent();
    }

    [HttpGet("{postId}")]
    public async Task<IActionResult> GetPost(Guid postId, CancellationToken cancellationToken)
    {
        var post = await _dbContext.Posts.FindAsync(new object[] { postId }, cancellationToken);
        if (post == null)
        {
            return NotFound();
        }

        return Ok(
            new PostViewModel
            {
                Id = post.Id,
                Title = post.Title,
                Body = post.Body,
                Date = post.Created
            });
    }
}
