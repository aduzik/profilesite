using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlexDuzik.ProfileSite.Web;
public class Post
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Body { get; set; }
    public DateTime Created { get; set; }
    public DateTime Modified { get; set; }
}
