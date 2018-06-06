using System.Collections.Generic;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IsracardGithubSearch.Controllers
{
    public class CrudController : Controller
    {
        public ActionResult GetBookmarks()
        {
            var bookmarks = Session["bookmarks"];

            return bookmarks == null
                ? (ActionResult) HttpNotFound()
                : Content(JsonConvert.SerializeObject(bookmarks, Formatting.Indented));
        }

        public string SaveBookmark(string payload)
        {
            var repo = JObject.Parse(payload);
            var repoId = repo["id"].ToString();
            var bookmarks = (Dictionary<string, string>)Session["bookmarks"] ?? new Dictionary<string, string>();

            bookmarks.Add(repoId, payload);
            Session["bookmarks"] = bookmarks;

            return repoId;
        }
    }
}