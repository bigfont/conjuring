using System.Web;
using System.Web.Optimization;

namespace ConjuringClub
{
    public class BundleConfig
    {         
        public static void RegisterBundles(BundleCollection bundles)
        {
            // 
            // Files will be minified and bundled iff EnableOptimizations is true OR compilation.debug is false.
            // EnableOptimizations overrides compilation.debug attribute.
            // 
            BundleTable.EnableOptimizations = false;
            bundles.UseCdn = true;                
            
            const string angularCdn = "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.4/angular.js";
            bundles.Add(new ScriptBundle("~/cdn/angular", angularCdn).Include(
                "~/Scripts/angular/angular.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/javascript").Include(
                "~/Scripts/google-analytics-object.js",
                "~/Scripts/controllers/*.js",
                "~/Scripts/app.js"));

            const string bootstrapCdn = "http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css";
            bundles.Add(new StyleBundle("~/bundles/bootstrap", bootstrapCdn).Include(
                "~/Content/bootstrap.css"));

            bundles.Add(new StyleBundle("~/bundles/app").Include("~/Content/app.css"));
        }
    }
}
