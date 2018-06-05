using System.Web.Mvc;
using Newtonsoft.Json.Linq;

namespace IsracardGithubSearch.Controllers
{
    public class GithubController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string Save(string playload)
        {
            var repo = JObject.Parse(playload);
            var repoId = repo["id"].ToString();
            Session[repoId] = repo;

            return repoId;
        }
    }
}