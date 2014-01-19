using System.Web;
using System.Web.Optimization;

namespace ConjuringClub
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;

            const string angularCdn = "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.4/angular.js";
            bundles.Add(new ScriptBundle("~/cdn/angular", angularCdn).Include(
                "~/Scripts/angular.js"));

            bundles.Add(new ScriptBundle("~/bundles/javascript").Include(
                "~/Scripts/app.js"));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/app.css"));
        }
    }
}
