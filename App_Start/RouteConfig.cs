using System.Web.Mvc;
using System.Web.Routing;

namespace IsracardGithubSearch
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // separate client and server conrollers loading
            // ----------------------------------------------------------------------

            routes.MapRoute(
                name: "angular",
                url: "Github/{*.}",
                defaults: new { controller = "Github", action = "Index" }
            );

            // standart mvc routing
            // ----------------------------------------------------------------------

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Github", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
