using Microsoft.AspNetCore.Mvc;

namespace AlexDuzik.ProfileSite.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : Controller
{
    [HttpGet]
    public IActionResult Authenticated()
    {
        var authenticated = HttpContext.User.Identity?.IsAuthenticated ?? false;

        return authenticated ? NoContent() : Unauthorized();
    }
}
