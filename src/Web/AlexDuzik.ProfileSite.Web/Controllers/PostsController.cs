using AlexDuzik.ProfileSite.Data;
using AlexDuzik.ProfileSite.Web.Models;
using AlexDuzik.ProfileSite.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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
            .Take(10);

        var viewModels = posts.Select(p => ToViewModel(p));

        return Ok(viewModels);
    }

    [HttpGet("{postId:guid}")]
    public async Task<IActionResult> GetPost(Guid postId, CancellationToken cancellationToken)
    {
        var post = await _dbContext.Posts.FindAsync(new object[] { postId }, cancellationToken);
        if (post == null)
        {
            return NotFound();
        }

        return Ok(ToViewModel(post));
    }

    [HttpGet("{year:int}/{month:int}/{slug}")]
    public async Task<IActionResult> FindPostByPermalink(int year, int month, string slug)
    {
        if (year < 2022 || year > 2099)
        {
            return BadRequest();
        }

        if (month < 1 || month > 12)
        {
            return BadRequest();
        }

        if (string.IsNullOrEmpty((slug)))
        {
            return BadRequest();
        }

        var post = await _dbContext.Posts
            .FirstOrDefaultAsync(p => 
                p.Permalink!.Year == year &&
                p.Permalink!.Month == month &&
                p.Permalink!.Slug == slug);
        
        if (post == null)
        {
            return NotFound();
        }

        var result = new PostViewModel
        {
            Id = post.Id,
            Title = post.Title,
            Slug = post.Permalink?.Slug,
            Date = post.Created,
            Body = post.Body
        };

        return Ok(result);
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
            Permalink = new Permalink
            {
                Year = now.Year,
                Month = now.Month,
                Slug = model.Slug
            },
            Body = model.Body,
        };

        _dbContext.Posts.Add(post);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(
            nameof(GetPost),
            new
            {
                postId = post.Id
            });
    }

    [HttpPut("{postId:guid}")]
    public async Task<IActionResult> UpdatePost(Guid postId, [FromForm] CreatePostModel model, CancellationToken cancellationToken)
    {
        var post = await _dbContext.Posts.FindAsync(new object[] { postId }, cancellationToken);

        if (post == null)
        {
            return NotFound();
        }

        post.Title = model.Title;
        post.Permalink = new()
        {
            Year = post.Created.Year,
            Month = post.Created.Month,
            Slug = model.Slug
        };
        post.Body = model.Body;
        post.Modified = DateTime.UtcNow;

        _dbContext.Posts.Update(post);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(ToViewModel(post));
    }

    [HttpDelete("{postId}")]
    public async Task<ActionResult> DeletePost(Guid postId, CancellationToken cancellationToken)
    {
        var post = await _dbContext.Posts.FindAsync(new object[] { postId }, cancellationToken);

        if (post == null)
        {
            return NotFound();
        }

        _dbContext.Posts.Remove(post);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return NoContent();
    }

    private static PostViewModel ToViewModel(Post post)
    {
        return new PostViewModel
        {
            Id = post.Id,
            Title = post.Title,
            Slug = post.Permalink?.Slug,
            Body = post.Body,
            Date = post.Created,
            Permalink = $"/blog/{post.Permalink?.Year:d4}/{post.Permalink?.Month:d2}/{post.Permalink?.Slug}"
        };
    }
}
